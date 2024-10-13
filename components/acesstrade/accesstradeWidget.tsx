import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AccesstradeWidget: React.FC = () => {
  const [utmSource, setUtmSource] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading

  useEffect(() => {
    const userId = Cookies.get("id");
    if (userId) {
      setUtmSource(userId);
    }
  }, []);

  useEffect(() => {
    if (utmSource) {
      const atWidgetElement = document.getElementById("at-widget");
      if (!atWidgetElement) return;

      let utm_content = "";
      let utm_medium = "";
      let utm_campaign = "";

      const atProductGenerateCss = `
        <style type="text/css">
          /* CSS code as in your original script */
          .at--direct-box {
            margin-top: 10px;
          }
          .at--btn-direct {
            background-color: #1570ef;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
          }
          .at--loading {
            font-size: 14px;
            color: #555;
            margin-top: 10px;
          }
        </style>`;

      const atProductGenerateHtml = `
        <div class="at--card">
          <!-- Campaign Info -->
          <div class="at--cps-wrap">
            <div class="at--cps-item">
              <img class="at--cps-campaign-thumb" src="https://content.accesstrade.vn/adv/1728028141_avatar_1728028141.gif"/>
            </div>
            <div class="at--cps-item">
              <a style="font-size: 18px;" rel="nofollow" target="_blank">Shopee Việt Nam Smartlink cho tất cả thiết bị</a>
              <b style="font-size: 20px;">Hoàn tiền không giới hạn</b>
            </div>
          </div>
          <hr>
          <!-- Convert Link -->
          <div class="at--cps-item">
            <label for="at--convert-link-value"><i>Dán link sau đó chuyển hướng đến trang mua hàng</i></label>
            <div class="at--convert-link-box">
              <input id="at--convert-link-value" class="at--input-box" placeholder="Dán link sản phẩm sẽ mua" type="text">  
              <button id="at--convert-link-btn" class="at--btn-box" type="button">Dán link</button>
            </div>
            <p id="at--error" class="at--error">Đường dẫn chưa được hỗ trợ! Vui lòng thử lại đường dẫn khác</p>
            <div id="at--loading" class="at--loading" style="display:none">Đang tạo link, vui lòng đợi...</div>
          </div>
        </div>`;

      atWidgetElement.innerHTML = atProductGenerateCss + atProductGenerateHtml;

      const convertLinkBtn = document.getElementById(
        "at--convert-link-btn"
      ) as HTMLButtonElement;
      const inputLink = document.getElementById(
        "at--convert-link-value"
      ) as HTMLInputElement;
      const atError = document.getElementById("at--error");
      const loadingElement = document.getElementById(
        "at--loading"
      ) as HTMLDivElement;

      const createDeepLinkBox = (deepLink: string): HTMLDivElement => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("at--direct-box");
        newDiv.id = "at--direct-box"; // Đặt ID cho div mới

        const newAnchor = document.createElement("a");
        newAnchor.href = deepLink;
        newAnchor.target = "_blank";
        newAnchor.textContent = "Mua Ngay";
        newAnchor.classList.add("at--btn-direct");

        newDiv.appendChild(newAnchor);
        return newDiv;
      };

      convertLinkBtn?.addEventListener("click", async () => {
        let text = inputLink.value.trim();
        if (!text) return;
        let directBox = document.getElementById("at--direct-box");

        // Hiện loading, ẩn nút mua ngay và khóa nút dán link
        setLoading(true);
        loadingElement.style.display = "block";
        convertLinkBtn.disabled = true;
        if (directBox) directBox.style.display = "none";

        // Ẩn nút "Mua Ngay" nếu có

        if (directBox) directBox.remove(); // Xóa nút cũ nếu đã tồn tại

        let deepLink = `https://go.isclix.com/deep_link/6019537891464095047/4751584435713464237?sub3=tooldirectlink&sub4=oneatweb`;
        if (utmSource) deepLink += "&utm_source=" + utmSource;
        if (utm_medium) deepLink += "&utm_medium=" + utm_medium;
        if (utm_campaign) deepLink += "&utm_campaign=" + utm_campaign;
        if (utm_content) deepLink += "&utm_content=" + utm_content;

        deepLink += "&url=" + encodeURIComponent(text);

        setTimeout(() => {
          // Mô phỏng thời gian xử lý để tạo hiệu ứng loading
          // Ẩn loading và hiện lại nút dán link
          setLoading(false);
          loadingElement.style.display = "none";
          convertLinkBtn.disabled = false;
          if (directBox) directBox.style.display = "block";

          // Thêm nút "Mua Ngay" mới
          atWidgetElement.appendChild(createDeepLinkBox(deepLink));
        }, 2000); // Giả lập delay 2 giây
      });
    }
  }, [utmSource]);

  return <div id="at-widget"></div>;
};

export default AccesstradeWidget;
