export const URL_API = "https://cashback-server-1.onrender.com";

export const NAVIGATION_LIST = {
  categories: [
    {
      id: "shop",
      name: "Mua sắm",
      featured: [
        {
          name: "Tất cả",
          href: "/product",
          imageSrc: "/shoe.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Giá tốt nhất",
          href: "/product?sort=price-asc",
          imageSrc: "/trainer.jpg",
          imageAlt: "Giá.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Thời trang",
          items: [
            { name: "Áo dài", href: "/product" },
            { name: "Khăn", href: "/product" },
            { name: "Áo thun", href: "/product" },
            { name: "Áo sơ mi", href: "/product" },
            { name: "Váy", href: "/product" },
            { name: "Đồ công sở", href: "/product" },
            { name: "Tất cả", href: "/product" },
          ],
        },
        {
          id: "giadung",
          name: "Gia dụng",
          items: [
            { name: "Nồi", href: "/product" },
            { name: "Bếp", href: "/product" },
            { name: "Bàn ghế", href: "/product" },
            { name: "Tủ", href: "/product" },
            { name: "Bát đũa", href: "/product" },
          ],
        },
        {
          id: "mom",
          name: "Mẹ và bé",
          items: [
            { name: "Gối cho bé", href: "/product" },
            { name: "Bỉm sữa", href: "/product" },
            { name: "Dinh dưỡng", href: "/product" },
            { name: "Khăn", href: "/product" },
          ],
        },
      ],
    },
    {
      id: "brand",
      name: "Thương hiệu",
      featured: [
        {
          name: "Tất cả",
          href: "/",
          imageSrc: "/shoe.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Giá tốt nhất",
          href: "/product?sort=price-asc",
          imageSrc: "/bag.jpg",
          imageAlt: "Giá tốt",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Thời trang",
          items: [
            { name: "JUNO", href: "/shop" },
            { name: "Tokyo life", href: "/shop" },
            { name: "VIỆT TIẾN", href: "/shop" },
            { name: "GUMAC", href: "/shop" },
            { name: "OWEN", href: "/shop" },
            { name: "Uniqlo", href: "/shop" },
            { name: "Tất cả", href: "/shop" },
          ],
        },
        {
          id: "giadung",
          name: "Gia dụng",
          items: [
            { name: "Sunhouse", href: "/shop" },
            { name: "Kangaroo", href: "/shop" },
            { name: "SATO", href: "/shop" },
          ],
        },
        {
          id: "mom",
          name: "Mẹ và bé",
          items: [
            { name: "Vườn của bé", href: "/shop" },
            { name: "Kid plaza", href: "/shop" },
            { name: "RICHELL", href: "/shop" },
            { name: "NUK", href: "/shop" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/our" },
    { name: "Hỗ trợ", href: "/support" },
    { name: "Sản phẩm", href: "/product" },
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

export const statsOur = [
  { label: "Doanh nghiệp và các cửa hàng liên kết", value: "1000" },
  { label: "Sản phẩm hoàn tiền và mã giảm giá", value: "Hơn 2000" },
  { label: "Hoàn tiền bất tận", value: "Không giới hạn" },
];

export const valuesOur = [
  {
    name: "Dẫn đầu xu hướng",
    description:
      "Hướng đến sự xuất sắc trong mọi khía cạnh. Cam kết mang lại trải nghiệm mua sắm hoàn tiền hàng đầu, giúp bạn tiết kiệm và tận hưởng nhiều hơn.",
  },
  {
    name: "Chia sẻ mọi giá trị",
    description:
      "Lan tỏa mọi kiến thức và cơ hội. QuickBack Shopping luôn đồng hành và chia sẻ những ưu đãi tốt nhất để bạn mua sắm thông minh hơn.",
  },
  {
    name: "Không ngừng học hỏi",
    description:
      "Luôn đổi mới và cải tiến để phục vụ bạn tốt hơn. Chúng tôi học hỏi từ nhu cầu của khách hàng và mang lại các giải pháp tối ưu nhất.",
  },
  {
    name: "Luôn đồng hành cùng bạn",
    description:
      "QuickBack Shopping đặt khách hàng lên hàng đầu. Chúng tôi hỗ trợ tận tình và luôn ở đây khi bạn cần.",
  },
  {
    name: "Chịu trách nhiệm",
    description:
      "Đảm bảo sự minh bạch và công bằng trong mọi giao dịch. Cam kết đem lại trải nghiệm mua sắm hoàn tiền đáng tin cậy.",
  },
  {
    name: "Tận hưởng cuộc sống",
    description:
      "Mua sắm tiết kiệm để bạn có thể dành thời gian cho những điều thực sự quan trọng. QuickBack Shopping giúp bạn tận hưởng trọn vẹn hơn.",
  },
];

export const teamOur = [
  {
    name: "Dermot Trần",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
];

export const blogPostsOur = [
  {
    id: 1,
    title: "Hướng dẫn hoàn tiền",
    href: "/policy",
    description:
      "Hoàn tiền dễ dàng, minh bạch với các bước sau. Giải đáp mọi thắc mắc của khách hàng",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Nov 30, 2024",
    datetime: "30-11-2024",
    author: {
      name: "Dermot Trần",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export const avaList = [
  "/ava2.svg",
  "/ava3.svg",
  "/ava4.svg",
  "/ava5.svg",
  "/ava6.svg",
  "/ava7.svg",
  "/ava8.svg",
  "/ava9.svg",
  "/ava10.svg",
  "/ava11.svg",
  "/ava12.svg",
];
