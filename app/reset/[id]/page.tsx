import InputSection from "@/components/input/input";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="text-center p-4">
      <h2 className="my-2 text-xl">Cập nhật mật khẩu mới</h2>
      <InputSection
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        required={true}
        label="Mật khẩu mới"
      />
      <br />
      <InputSection
        type="password"
        name="confirm-password"
        id="confirm-password"
        placeholder="••••••••"
        required={true}
        label="Xác nhận mật khẩu"
        // showError={confirmPassword !== password && confirmPassword.length > 0}
        contentError="Wrong password"
      />
    </div>
  );
};

export default App;
