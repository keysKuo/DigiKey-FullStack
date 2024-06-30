import type { Schema, Attribute } from '@strapi/strapi';

export interface CartCartItem extends Schema.Component {
  collectionName: 'components_cart_cart_items';
  info: {
    displayName: 'CartItem';
    icon: 'archive';
    description: '';
  };
  attributes: {
    qty: Attribute.Integer;
    name: Attribute.String;
    items: Attribute.Relation<
      'cart.cart-item',
      'oneToMany',
      'api::product.product'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'cart.cart-item': CartCartItem;
    }
  }
}
