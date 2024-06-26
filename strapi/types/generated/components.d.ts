import type { Schema, Attribute } from '@strapi/strapi';

export interface HomeSanPhamNoiBat extends Schema.Component {
  collectionName: 'components_home_san_pham_noi_bats';
  info: {
    displayName: 'S\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt';
    icon: 'earth';
  };
  attributes: {
    list: Attribute.Relation<
      'home.san-pham-noi-bat',
      'oneToMany',
      'api::product-type.product-type'
    >;
  };
}

export interface HomeTuKhoaNoiBat extends Schema.Component {
  collectionName: 'components_home_tu_khoa_noi_bats';
  info: {
    displayName: 'T\u1EEB kh\u00F3a n\u1ED5i b\u1EADt';
    icon: 'archive';
  };
  attributes: {
    list: Attribute.Relation<
      'home.tu-khoa-noi-bat',
      'oneToMany',
      'api::category.category'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'home.san-pham-noi-bat': HomeSanPhamNoiBat;
      'home.tu-khoa-noi-bat': HomeTuKhoaNoiBat;
    }
  }
}
