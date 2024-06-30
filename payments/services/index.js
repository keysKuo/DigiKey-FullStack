const stripeAPI = require("stripe");
const paypal = require("paypal-rest-sdk");
const fetch = require("node-fetch");
const libs = require("sud-libs");
require("dotenv").config();

paypal.configure({
	mode: "sandbox", //sandbox or live
	client_id: process.env.PAYPAL_CLIENTID,
	client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

let stripeGateway = stripeAPI(process.env.STRIPE_API_KEY);

const exchangeRate = async (from, to) => {
	return await fetch(
		`https://open.er-api.com/v6/latest/${from.toUpperCase()}`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}
	)
		.then(async (response) => {
			const result = await response.json();
			if (result.result == "success") {
				let rate = result.rates[to.toUpperCase()];
				// console.log(rate)
				return rate;
			}

			return 0;
		})
		.catch((err) => {
			return 0;
		});
};

// Params: options
// {
//     items (name, price, quantity, image?) - [Danh sách sản phẩm],
//     success_url, cancel_url - [Callback url]
// }
const createStripeSession = async (options) => {
	try {
		const { items, success_url, cancel_url } = options;

		const lineItems = items.map((item) => {
			const unitAmount = Math.round(item.price * 100);
			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: item.name,
						images: [
							item.image ||
								"https://react.semantic-ui.com/images/wireframe/square-image.png",
						],
					},
					unit_amount: unitAmount,
				},
				quantity: item.quantity,
			};
		});

		// console.log(lineItems);

		const session = await stripeGateway.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			success_url: success_url,
			cancel_url: cancel_url,
			line_items: lineItems,
			//  Asking address in Stripe
			billing_address_collection: "required",
		});

		// console.log(session);

		return {
			paymentId: session.id,
			url: session.url,
		};
	} catch (error) {
		console.log(error);
		return undefined;
	}
};

// Params: options
// {
//     items (name, price, quantity) - [Danh sách sản phẩm]
//     total - [Tống tiền]
//     success_url, cancel_url - [Callback url]
// }
const createPaypalSession = async (options) => {
	try {
		const { success_url, cancel_url, items, total } = options;
		const create_payment_json = {
			intent: "sale",
			payer: {
				payment_method: "paypal",
			},
			redirect_urls: {
				return_url: success_url,
				cancel_url: cancel_url,
			},
			transactions: [
				{
					item_list: {
						items: items.map((item) => {
							return {
								...item,
								price: item.price.toFixed(2),
								currency: "USD",
							};
						}),
					},
					amount: {
						currency: "USD",
						total: total.toFixed(2),
					},
					description: "SUD payment gateway test",
				},
			],
		};

		const payment = await new Promise((resolve, reject) => {
			paypal.payment.create(
				create_payment_json,
				function (error, payment) {
					if (error) {
						console.log(error.response.details);
						reject(error);
					} else {
						// console.log(payment)
						resolve(payment);
					}
				}
			);
		});

		for (let i = 0; i < payment.links.length; i++) {
			if (payment.links[i].rel === "approval_url") {
				return {
					paymentId: payment.id,
					url: payment.links[i].href,
				};
			}
		}
	} catch (error) {
		console.log(error);
		return undefined;
	}
};

const getPaymentDetails = async (paymentType, paymentId) => {
	switch (paymentType) {
		case "paypal": {
			return new Promise((resolve, reject) => {
				paypal.payment.get(paymentId, (error, payment) => {
					if (error) {
						reject(error);
					} else {
                        // console.log(payment);
						resolve(payment);
					}
				});
			});
		}
		case "stripe": {
			return stripeGateway.checkout.sessions
				.retrieve(paymentId)
				.then((session) => {
                    // console.log(session)
					return session;
				})
				.catch((error) => {
					throw error;
				});
		}
		default:
			return null;
	}
};

const auth = {
	user: process.env.EMAIL,
	pass: process.env.PASSWORD,
};

const sendMail = (options, cb) => {
	return libs.sendMail(auth, { ...options, from: auth.user }, cb);
};

const mailForm = (options) => {
	let logo_link = options.logo_link;
	let caption = options.caption || "";
	let content = options.content || "";

	return `
    <link href="https://fonts.cdnfonts.com/css/roboto" rel="stylesheet">
    <div 
        style="width: 450px; margin: 0 auto;
        text-align: center; font-family: 'Google Sans', Roboto, sans-serif;
        min-height: 300px;
        border-width: 3px; border-style: solid; border-color: #3B3486; border-radius: 10px">

        <div style="width: 100%; height: 200px; margin-bottom: 20px; background-color: #3B3486;
        display: flex; justify-content: center; align-items: center; border-bottom: 3px solid #3B3486;">
            <img style="width: 150px;
                height: 150px; margin: auto;" src="${logo_link}" />
        </div>

        <div style="
            color: rgba(0,0,0,0.87);
            line-height: 32px;
            padding-bottom: 24px;
            text-align: center;
            word-break: break-word;
            font-size: 22px">

            ${caption}
        </div>

        <div style="border: 3px solid #3B3486;
            color: rgba(0,0,0,0.87);
            line-height: 26px;
            text-align: center;
            word-break: break-word;
            font-size: 18px;
            margin: 0 30px;">

            ${content}
        </div>

        <p style="margin-top: 25px">Mọi thắc mắc vui lòng liên hệ shopdigikey@gmail.com</p>
        <p>Hotline: 095428542 - DigiKey</p>
    </div>
    `;
};

function toQueryString(collection, json) {
    const queryString = [];
  
    function buildQueryString(prefix, obj) {
      if (Array.isArray(obj)) {
        obj.forEach((value, index) => {
          buildQueryString(`${prefix}[${index}]`, value);
        });
      } else if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(key => {
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            buildQueryString(`${prefix}[${key}]`, obj[key]);
          } else {
            buildQueryString(`${prefix}[${key}]`, obj[key]);
          }
        });
      } else {
        queryString.push(`${prefix}=${obj}`);
      }
    }
  
    Object.keys(json).forEach(key => {
      buildQueryString(key, json[key]);
    });
  
    return `${collection}?${queryString.join('&')}`;
  }

async function testStripe() {
	const rate = await exchangeRate("vnd", "usd");
	let result = await createStripeSession({
		items: [
			{
				name: "Product test",
				price: 215000 * rate,
				quantity: 2,
				image: "https://tressays.files.wordpress.com/2015/09/test-clip-art-cpa-school-test.png",
			},
		],
		success_url: "http://localhost:3000/success",
		cancel_url: "http://localhost:3000/fail",
	});

	console.log(result);
}

async function testPaypal() {
	const rate = await exchangeRate("vnd", "usd");
	let result = await createPaypalSession({
		items: [
			{
				name: "Product test",
				price: 200000 * rate,
				quantity: 2,
			},
		],
		total: 400000 * rate,
		success_url: "http://localhost:3000/success",
		cancel_url: "http://localhost:3000/fail",
	});

	console.log(result);
}

// testPaypal();
// testStripe();

module.exports = {
	exchangeRate,
	createStripeSession,
	createPaypalSession,
	getPaymentDetails,
	sendMail,
	mailForm,
	toQueryString
};
