import { useEffect, useRef } from 'react';

const MediaMartWidget: React.FC = () => {
  const atWidgetRef = useRef<HTMLDivElement | null>(null);
  const utmSource = 'user_id';
  const utmContent = '';
  const utmMedium = '';
  const utmCampaign = '';

  useEffect(() => {
    if (!atWidgetRef.current) return;

    const atProductGenerateCss = `
      <style type="text/css">
        .at--card-media-mart {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
        }
        .at--card-media-mart h5 {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .at--description {
          color: #666;
          font-size: 14px;
          margin-top: 8px;
        }
        .at--convert-link {
          display: flex;
          align-items: center;
          margin-top: 16px;
        }
        .at--convert-link input {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-right: 8px;
        }
        .at--convert-link button {
          background-color: #ef2315;
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .at--direct-box-media-mart a {
          display: block;
          text-align: center;
          background-color: #ef2315;
          color: white;
          padding: 10px;
          border-radius: 4px;
          text-decoration: none;
          margin-top: 16px;
        }
        .at--error {
          color: red;
          font-size: 12px;
          display: none;
          margin-top: 8px;
        }
      </style>
    `;

    const atProductGenerateHtml = `
       <div class="at--card-media-mart">
        <div class="at--cps-wrap">
          <div class="at--cps-item at--mauto">
            <div class="at--cps-campaign-thumb">
              <img class="at--radius" src="https://content.accesstrade.vn/adv/1712566083_avatar_1712566083.jpg"/>
            </div>
          </div>
          <div class="at--cps-item">
            <a style="font-size: 18px" rel="nofollow" target="_blank" rel="nofollow">MediaMart Mua sắm thả ga</a>
            <b style="font-size:20px">4%</b>
          </div>
        </div>
        <hr>
        <div class="at--cps-item">
          <label for=""><i>Dán link sau đó chuyển hướng đến trang mua hàng</i></label>
          <div class="at--convert-link-box">
            <div class="at--cps-item at--link-box">
              <input id="at--convert-link-value-media-mart" class="at--input-box" placeholder="Dán link sản phẩm sẽ mua" type="text">  
            </div>
            <div class="at--cps-item">
              <button id="at--convert-link-btn" class="at--w100 at--btn-box" type="button">Dán link</button>
            </div>
          </div>
          <p id="at--error" class="at--error d-none-media-mart">Đường dẫn chưa được hỗ trợ! Vui lòng thử lại đường dẫn khác</p>
        </div>
      </div>`;

    const atProductGenerateElement = atWidgetRef.current;
    atProductGenerateElement.innerHTML = atProductGenerateCss + atProductGenerateHtml;

    const campaignDomain = new URL('https://mediamart.vn/').hostname;
    const atError = document.getElementById('at--error') as HTMLElement | null;
    const convertLinkBtn = document.getElementById('at--convert-link-btn') as HTMLButtonElement | null;

    async function fetchDataLink(link: string) {
      try {
        const res = await fetch('https://pub2-api.accesstrade.vn/v1/tools/get-original-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ raw_link: link }),
        });
        const data = await res.json();
        return data;
      } catch (e) {
        console.error(e);
        return { status_code: 0, message: 'Error get original link' };
      }
    }

    async function setText(text: string) {
      const response = await fetchDataLink(text);
      return response?.status_code === 1 && response?.success_link ? response.success_link : text;
    }

    function createDeepLinkBox(deepLink: string, btnColor: string, btnText: string) {
      const newDiv = document.createElement('div');
      if (!document.querySelector('.at--direct-box-media-mart')) {
        newDiv.className = 'at--direct-box-media-mart';
        const newAnchor = document.createElement('a');
        newAnchor.href = deepLink;
        newAnchor.target = '_blank';
        newAnchor.style.background = btnColor;
        newAnchor.textContent = btnText;
        newDiv.appendChild(newAnchor);
      }
      return newDiv;
    }

    function validateURL(originalLink: string, value: string) {
      const URLObj = new URL(value);
      return originalLink === URLObj.hostname;
    }

    const handleConvertClick = async () => {
      if (!convertLinkBtn) return;
      try {
        const text = await navigator.clipboard.readText();
        const inputLink = document.getElementById('at--convert-link-value-media-mart') as HTMLInputElement;
        const directBox = document.querySelector('.at--direct-box-media-mart');
        if (directBox) directBox.remove();
        
        const validatedText = await setText(text.trim());
        if (!validateURL(campaignDomain, validatedText)) {
          atError?.classList.remove('d-none-media-mart');
          return;
        } else {
          atError?.classList.add('d-none-media-mart');
        }

        let deepLink = `https://go.isclix.com/deep_link/6019537891464095047/6009072433920808367?sub3=tooldirectlink&sub4=oneatweb`;
        if (utmSource) deepLink += `&utm_source=${utmSource}`;
        if (utmMedium) deepLink += `&utm_medium=${utmMedium}`;
        if (utmCampaign) deepLink += `&utm_campaign=${utmCampaign}`;
        if (utmContent) deepLink += `&utm_content=${utmContent}`;

        deepLink += `&url=${validatedText}`;
        atProductGenerateElement.appendChild(createDeepLinkBox(deepLink, '#ef2315', 'Mua Ngay'));
      } catch (error) {
        console.error('Failed to read clipboard contents:', error);
      }
    };

    convertLinkBtn?.addEventListener('click', handleConvertClick);

    return () => {
      convertLinkBtn?.removeEventListener('click', handleConvertClick);
    };
  }, []);

  return <div ref={atWidgetRef} id="at-widget-media-mart"></div>;
};

export default MediaMartWidget;
