export const URL_API = "http://localhost:5000";

export const NAVIGATION_LIST = {
  categories: [
    {
      id: "shop",
      name: "Mua sắm",
      featured: [
        {
          name: "Cơ bản",
          href: "#",
          imageSrc: "/shoe.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Hoàn tiền cao",
          href: "#",
          imageSrc: "trainer.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Thời trang",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "giadung",
          name: "Gia dụng",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "mom",
          name: "Mẹ và bé",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "brand",
      name: "Thương hiệu",
      featured: [
        {
          name: "Hot",
          href: "#",
          imageSrc: "shoe.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Hoàn tiền cao",
          href: "#",
          imageSrc: "bag.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Thời trang",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "giadung",
          name: "Gia dụng",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "mom",
          name: "Mẹ và bé",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Trang chủ", href: "/" },
    { name: "Liên hệ", href: "#" },
    { name: "Chính sách", href: "#" },
  ],
};

export const CATEGORIES = [
  "Thời trang",
  "Điện tử",
  "Mỹ phẩm",
  "Đồ gia dụng",
  "Thực phẩm chức năng",
  "Đồ dùng văn phòng",
  "Đồ chơi",
  "Sách",
  "Vé máy bay",
  "Khách sạn",
  "Đồ thể thao",
  "Mẹ và bé",
];

export const images = [
  {
    id: 1,
    src: "/Lotus_05.svg",
    title: "Black Coffee",
    desc: "Black coffee is a beverage made from roasted coffee beans. The beans are ground and soaked in water, which releases their flavor, color, caffeine content, and nutrients. ",
  },
  {
    id: 2,
    src: "/Cactus_05.svg",
    title: "Cappuccino",
    desc: "A cappuccino is an espresso-based coffee drink that is traditionally prepared with steamed milk foam (microfoam). Cappuccino. Type, Hot.",
  },
  {
    id: 3,
    src: "/Mushroom_05.svg",
    title: "Espresso",
    desc: "Espresso is a concentrated form of coffee, served in shots. It's made of two ingredients - finely ground, 100% coffee, and hot water.",
  },
  {
    id: 4,
    src: "/Sunflower_05.svg",
    title: "Latte",
    desc: "A latte or caffè latte is a milk coffee that boasts a silky layer of foam as a real highlight to the drink. A true latte will be made up of one or two shots of espresso, steamed milk and a final, thin layer of frothed milk on top",
  },
];
