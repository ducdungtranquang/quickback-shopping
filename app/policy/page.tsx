/* eslint-disable react/no-unescaped-entities */
"use client";

import Tabs from "@/components/tabs/tabs";
import useAuth from "@/hook/useAuth";
import NavBar from "@/layout/app/navbar";
import { useEffect, useState } from "react";

export default function PolicyPgae() {
  const { isAuthenticated } = useAuth(false);
  const [activeTab, setActiveTab] = useState("policy");

  const tabs = [
    {
      id: "policy",
      label: "Chính  sách bảo mật",
      content: (
        <>
          <h2 className="p-4 text-center text-2xl text-bold">Chính sách </h2>
          <p className="mb-3 text-black-500 dark:text-black-400">
            Mục đích của tài liệu này là để thông báo cho bạn cách QuickBack
            quản lý, thu thập, sử dụng và tiết lộ Dữ Liệu Cá Nhân liên quan đến
            bạn và những người dùng khác của trang web của chúng tôi, tiện ích
            mở rộng cho trình duyệt web trên máy tính để bàn (“tiện ích trang
            web mở rộng”), ứng dụng phần mềm, ứng dụng di động và các nền tảng
            khác. Tại Việt Nam, các hoạt động kinh doanh như vậy phải tuân thủ
            theo các quy định khác nhau của pháp luật Việt Nam về bảo vệ dữ liệu
            cá nhân (“Đạo Luật”). Chúng tôi tiến hành kinh doanh tuân thủ theo
            Đạo luật, và đã thực hiện các biện pháp bổ sung để bảo vệ thông tin
            cá nhân của bạn. Dựa theo các quyền luật định của bạn, bạn đồng ý bị
            ràng buộc bởi các điều khoản hiện hành của Chính sách bảo vệ Dữ Liệu
            Cá Nhân được cập nhật theo thời gian trên trang web của chúng tôi.
          </p>
          <p className="text-black-500 dark:text-black-400">
            Trong Chính sách bảo vệ Dữ Liệu Cá Nhân này, "Dữ Liệu Cá Nhân" tham
            chiếu đến bất kỳ dữ liệu nào, cho dù đúng hay không, về một cá nhân
            có thể được xác định từ dữ liệu đó, hoặc từ dữ liệu đó cùng các
            thông tin khác mà chúng tôi có hoặc có khả năng truy cập, bao gồm cả
            dữ liệu trong hồ sơ của chúng tôi được cập nhật theo từng thời
            điểm.Trong Chính sách bảo vệ Dữ Liệu Cá Nhân này, "Dữ Liệu Cá Nhân"
            tham chiếu đến bất kỳ dữ liệu nào, cho dù đúng hay không, về một cá
            nhân có thể được xác định từ dữ liệu đó, hoặc từ dữ liệu đó cùng các
            thông tin khác mà chúng tôi có hoặc có khả năng truy cập, bao gồm cả
            dữ liệu trong hồ sơ của chúng tôi được cập nhật theo từng thời điểm.
          </p>
        </>
      ),
    },
    {
      id: "secure",
      label: "Điều khoản",
      content: (
        <>
          <h2 className="p-4 text-center text-2xl text-bold">Điều khoản </h2>
          <p className="mb-3 text-black-500 dark:text-black-400">
            Căn cứ theo Thỏa Thuận này, QuickBack sau đây cấp cho bạn quyền sử
            dụng có thể hủy ngang, không độc quyền, không thể chuyển nhượng
            (không bao gồm quyền sử dụng thứ cấp) để truy cập và sử dụng Nền
            Tảng QuickBack và Dịch Vụ cho mục đích sử dụng duy nhất của cá nhân
            bạn. Bạn đồng ý rằng bạn không có quyền nào ngoài các quyền lợi và
            quyền sử dụng được cấp rõ ràng theo Thỏa Thuận này. QuickBack bảo
            lưu các quyền thay đổi, nâng cấp hoặc ngưng bất kỳ hoặc tất cả Dịch
            Vụ hoặc Nền Tảng QuickBack hoặc bất kỳ chức năng của Dịch Vụ hoặc
            của Nền Tảng QuickBack bất cứ lúc nào, có hoặc không có thông báo.
            Tất cả các quyền lợi không được cấp rõ ràng theo Thỏa Thuận này được
            bảo lưu bởi QuickBack và các bên cấp phép của QuickBack.
          </p>
          <p className="text-black-500 dark:text-black-400">
            Một số Dịch Vụ yêu cầu người dùng phải duy trì một tài khoản với
            QuickBack. Người dùng có thể tạo một tài khoản miễn phí bằng cách
            cung cấp các chi tiết có liên quan được yêu cầu. Việc sử dụng tài
            khoản và Dịch Vụ (bao gồm các cơ hội được Hoàn Tiền từ các đối tác
            thương nhân của chúng tôi và/hoặc chúng tôi) được cung cấp dựa trên
            quyết định riêng của QuickBack và căn cứ theo sự tuân thủ của bạn
            với Thỏa Thuận này. Một cá nhân không được tạo hoặc có quyền kiểm
            soát và/hoặc nắm giữ nhiều tài khoản QuickBack. Cụ thể: (a) Mỗi số
            điện thoại di động chỉ có thể kết nối với một tài khoản QuickBack;
            (b) Mỗi tài khoản thanh toán (ví dụ mỗi tài khoản ngân hàng, mỗi tài
            khoản paypal) chỉ có thể kết nối với một tài khoản QuickBack; Việc
            không tuân thủ bất kỳ điều khoản và điều kiện nào, bất kỳ sự gian
            lận hoặc lạm dụng nào liên quan đến việc tích lũy hoặc nhận tiền
            hoàn lại và/hoặc các phần thưởng khác, và/hoặc bất kỳ sự cung cấp
            sai lệch của bất kỳ thông tin nào gửi đến QuickBack hoặc các chi
            nhánh của QuickBack đều có thể dẫn đến tài khoản QuickBack của bạn
            bị đánh dấu là hoạt động đáng ngờ và bị đình chỉ hoặc chấm dứt và
            bất kỳ khoản Hoàn Tiền tích lũy nào của bạn sẽ bị tịch thu.
          </p>
          <div className="text-black-500 dark:text-black-400 mt-4">
            Trong số các dịch vụ do QuickBack cung cấp có cơ hội nhận giảm giá,
            chiết khấu ưu đãi hoặc phần thưởng như hoàn lại tiền hoặc các chương
            trình khuyến mãi khác từ các đối tác thương nhân của chúng tôi
            và/hoặc QuickBack tính trên các giao dịch mua hàng được thực hiện
            tại các đối tác thương nhân khác nhau của chúng tôi thông qua các
            Nền Tảng QuickBack khác nhau. Việc tạo và duy trì tài khoản với
            QuickBack là bắt buộc trước khi người dùng có thể bắt đầu nhận tiền
            hoàn lại. Việc ghi có cho số tiền hoàn lại cũng phải tuân theo các
            điều khoản, điều kiện và yêu cầu khác nhau, rõ ràng hoặc ngụ ý, liên
            quan đến tín dụng hoàn lại tiền nói chung hoặc các điều khoản, điều
            kiện và yêu cầu đính kèm trong các chương trình khuyến mãi cá nhân
            sẽ được áp dụng. Những điều khoản, điều kiện và yêu cầu này bao gồm
            nhưng không giới hạn ở việc:
            <p>
              {" "}
              (+) Yêu cầu người dùng kích hoạt cookies trong suốt quá trình truy
              cập Nền Tảng QuickBack và sau đó là trang web của đối tác thương
              nhân;
            </p>{" "}
            <p>
              (+) Không mở một cửa sổ hoặc trình duyệt riêng biệt trong khi truy
              cập Nền Tảng QuickBack và sau đó là trang web của đối tác thương
              nhân;
            </p>{" "}
            <p>
              (+) Đảm bảo rằng sau khi được chuyển hướng đến trang web của đối
              tác thương nhân, người dùng sẽ hoàn tất giao dịch trước khi tiếp
              tục với bất kỳ trang web nào khác;{" "}
            </p>
            <p>
              (+) Hoàn tất giao dịch mua hàng trên trang web của thương nhân
              trong một khoảng thời gian nhất định;{" "}
            </p>
            <p>
              (+) Không tham gia vào bất kỳ hành vi gian lận hoặc không trung
              thực nào và/hoặc tuân thủ các điều khoản của Thỏa Thuận này hoặc
              bất kỳ điều khoản và điều kiện nào khác được quy định bởi
              QuickBack hoặc đối tác thương nhân hiện hành; Ngoài ra, một số
              giao dịch mua hàng nhất định có thể không được áp dụng việc Hoàn
              Tiền. Nhìn chung, việc Hoàn Tiền được nhận từ thương nhân và/hoặc
              QuickBack tính trên giá mua gốc không bao gồm vận chuyển và xử lý.
              Tuy nhiên, số tiền hoàn lại và trường hợp không áp dụng Hoàn Tiền
              sẽ khác nhau giữa các đối tác thương nhân và các chương trình
              khuyến mãi cá nhân có thể bao gồm các trường hợp không áp dụng cụ
              thể. Vui lòng xem lại các điều khoản này một cách cẩn thận. Các
              trường hợp không áp dụng này được căn cứ trên thay đổi không cần
              báo trước, và QuickBack theo đây từ chối bất kỳ và mọi trách nhiệm
              pháp lý liên quan đến bất kỳ thông tin không chính xác nào hoặc
              thất bại trong việc bao quát hết các thông tin trong danh sách
              loại trừ. Một số ví dụ về các trường hợp không áp dụng Hoàn Tiền
              điển hình bao gồm (nhưng không giới hạn trong) việc:
              <p>
                (-) Không đủ điều kiện Hoàn Tiền khi mua các mặt hàng khuyến mãi
                hoặc khi được sử dụng cùng lúc với các mã chiết khấu, phiếu giảm
                giá hoặc các chương trình khuyến mãi khác; <br />
                (-) Chỉ đủ điều kiện Hoàn Tiền khi giao dịch được hoàn thành
                bằng các phương thức thanh toán được chỉ định; và <br />
                (-) Hoàn Tiền không được áp dụng cho các giao dịch mua hàng mà
                QuickBack xác định là không hợp lệ (ví dụ: các giao dịch mua sắm
                gian lận để tích lũy và (hoặc) quy đổi Hoàn Tiền, nhằm mục đích
                tối đa hóa lợi nhuận cá nhân).
              </p>
            </p>
          </div>
        </>
      ),
    },
    {
      id: "help",
      label: "Hướng dẫn hoàn tiền",
      content: (
        <div>
          <h2 className="p-4 text-center text-2xl text-bold">Hướng dẫn </h2>
          <div className="mb-3 text-black-500 dark:text-black-400">
            <p>
              - Đăng nhập sau đó tìm tên cửa hàng, sản phẩm hoặc dán link sản
              phẩm bạn muốn mua vào website
            </p>
            <p>
              - Truy cập và thực hiện mua sắm ( Mọi sản phẩm mua đều phải được
              thông qua từ phía website )
            </p>
            <p>
              - Kiểm tra tiền trong tài khoản. Rút tiền về tài khoản ngân hàng
              sau khi được xác thực.
            </p>
            <br />
            <p>Lưu ý:</p>
            <p>
              Hoàn tất giao dịch mua hàng trên trang web của thương nhân trong
              một khoảng thời gian nhất định
            </p>
            <p>
              Không tham gia vào bất kỳ hành vi gian lận hoặc không trung thực
              nào và/hoặc tuân thủ các điều khoản của Thỏa Thuận này hoặc bất kỳ
              điều khoản và điều kiện nào khác được quy định bởi QuickBack hoặc
              đối tác thương nhân hiện hành; Ngoài ra, một số giao dịch mua hàng
              nhất định có thể không được áp dụng việc Hoàn Tiền. Nhìn chung,
              việc Hoàn Tiền được nhận từ thương nhân và/hoặc QuickBack tính
              trên giá mua gốc không bao gồm vận chuyển và xử lý. Tuy nhiên, số
              tiền hoàn lại và trường hợp không áp dụng Hoàn Tiền sẽ khác nhau
              giữa các đối tác thương nhân và các chương trình khuyến mãi cá
              nhân có thể bao gồm các trường hợp không áp dụng cụ thể. Vui lòng
              xem lại các điều khoản này một cách cẩn thận. Các trường hợp không
              áp dụng này được căn cứ trên thay đổi không cần báo trước, và
              QuickBack theo đây từ chối bất kỳ và mọi trách nhiệm pháp lý liên
              quan đến bất kỳ thông tin không chính xác nào hoặc thất bại trong
              việc bao quát hết các thông tin trong danh sách loại trừ.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className="container">
      <NavBar isAuthenticated={isAuthenticated} />
      <div className="bg-black-100 dark:bg-black-800 py-8 mt-[100px] px-4 h-full min-h-screen">
        <h2 className="mt-[20px] text-center">
          Điều khoản và chính sách bảo mật
        </h2>
        <Tabs
          tabs={tabs}
          onTabClick={handleTabClick}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
