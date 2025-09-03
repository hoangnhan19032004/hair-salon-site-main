

const TermsOfService: React.FC = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#2c3856] mb-6">ĐIỀU KHOẢN DỊCH VỤ</h1>
        <p className="mb-4 text-gray-700">
          Chào mừng quý khách đến với HairSalon. Bằng việc truy cập và sử dụng website cùng các dịch vụ của HairSalon,
          quý khách đồng ý tuân theo các điều khoản và điều kiện dưới đây. Nếu quý khách không đồng ý với bất kỳ điều khoản nào,
          xin vui lòng không sử dụng dịch vụ của chúng tôi.
        </p>
        <ol className="space-y-6 list-decimal ml-6 text-gray-700">
          <li>
            <strong>Phạm vi dịch vụ:</strong>
            <p className="mt-2">
              HairSalon cung cấp các dịch vụ tư vấn, đặt lịch, mua sắm sản phẩm và các dịch vụ liên quan đến chăm sóc tóc và sắc đẹp.
              Chúng tôi cam kết cung cấp thông tin chính xác và cập nhật, tuy nhiên không đảm bảo tuyệt đối cho mọi trường hợp.
            </p>
          </li>
          <li>
            <strong>Quyền và trách nhiệm của người dùng:</strong>
            <p className="mt-2">
              Quý khách cam kết sử dụng dịch vụ của HairSalon một cách hợp pháp, đúng quy định của pháp luật và không gây nhiễu loạn hệ thống.
              Quý khách chịu trách nhiệm về thông tin cá nhân và nội dung đăng tải trên hệ thống.
            </p>
          </li>
          <li>
            <strong>Quyền và trách nhiệm của HairSalon:</strong>
            <p className="mt-2">
              HairSalon nỗ lực cung cấp dịch vụ chất lượng và bảo mật thông tin cá nhân của quý khách theo các tiêu chuẩn an toàn.
              Tuy nhiên, chúng tôi không chịu trách nhiệm đối với những thiệt hại phát sinh từ thông tin sai lệch hoặc gián đoạn dịch vụ.
            </p>
          </li>
          <li>
            <strong>Bảo mật thông tin:</strong>
            <p className="mt-2">
              HairSalon thực hiện các biện pháp bảo mật phù hợp nhằm bảo vệ thông tin cá nhân của quý khách.
              Quý khách cần giữ bí mật thông tin đăng nhập và chịu trách nhiệm nếu xảy ra hành vi sử dụng trái phép tài khoản.
            </p>
          </li>
          <li>
            <strong>Thay đổi điều khoản:</strong>
            <p className="mt-2">
              HairSalon có quyền sửa đổi, bổ sung điều khoản này mà không cần báo trước. Quý khách nên định kỳ kiểm tra lại điều khoản dịch vụ để cập nhật.
            </p>
          </li>
          <li>
            <strong>Chấm dứt dịch vụ:</strong>
            <p className="mt-2">
              HairSalon có quyền đình chỉ hoặc chấm dứt cung cấp dịch vụ nếu phát hiện quý khách vi phạm điều khoản sử dụng, hoặc khi có
              sự cố kỹ thuật hoặc bất khả kháng xảy ra.
            </p>
          </li>
          <li>
            <strong>Giới hạn trách nhiệm:</strong>
            <p className="mt-2">
              Trong mọi trường hợp, HairSalon không chịu trách nhiệm với những thiệt hại gián tiếp, đặc biệt hoặc hậu quả do việc sử dụng
              hoặc không sử dụng dịch vụ, kể cả khi đã được thông báo trước.
            </p>
          </li>
          <li>
            <strong>Luật áp dụng và giải quyết tranh chấp:</strong>
            <p className="mt-2">
              Điều khoản dịch vụ này được điều chỉnh theo pháp luật Việt Nam. Mọi tranh chấp phát sinh từ việc sử dụng dịch vụ của HairSalon
              sẽ được giải quyết thông qua thương lượng; nếu không thể giải quyết, tranh chấp sẽ được đưa ra tòa án có thẩm quyền tại Việt Nam.
            </p>
          </li>
        </ol>
        <p className="mt-8 text-gray-700">
          Bằng cách sử dụng dịch vụ của HairSalon, quý khách đã đồng ý với tất cả các điều khoản nêu trên. HairSalon cam kết không ngừng cải thiện dịch vụ
          nhằm mang lại trải nghiệm tốt nhất cho quý khách.
        </p>
      </div>
    </section>
  );
};

export default TermsOfService;
