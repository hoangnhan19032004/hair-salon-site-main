import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs: React.FC = () => {
  return (
    <div className="relative font-segoe">
      <Header isScrolled={true} />
      <main className="pt-20 bg-[#F5F5F7] text-[#15397F]">
        <div className="container max-w-[1200px] mx-auto px-4 lg:px-0 pt-1 pb-10 md:pt-10 md:pb-14">
          <div className="grid grid-cols-1 gap-5 md:gap-[43px] mt-3 md:mt-[20px]">
            {/* Section 1 */}
            <div>
              <div className="uppercase font-bold text-base md:text-[26px] mt-5 text-[#15397F] pl-1 border-l-[6px] border-[#A0C9EB]">
                HAIR - ĐIỂM TỰA CHO VIỆC LỚN
              </div>
              <div className="text-sm md:text-lg mt-5 text-[#15397F] flex flex-col gap-1">
                <div className="italic">"Hãy cho tôi một điểm tựa, tôi sẽ nâng cả thế giới." - Archimedes</div>
                <div>Mỗi người đàn ông đều có một hành trình riêng, một thế giới muốn chinh phục</div>
                <div>Có người đang tiến về đích, có người vẫn đang tìm hướng đi</div>
                <div>Có người biết chính xác điều mình muốn, có người đang từng bước khám phá</div>
                <div className="font-semibold">Dù anh đang ở đâu trên hành trình ấy – bản lĩnh và sự tự tin luôn có trong chính anh</div>
                <div>
                  HAIR không tạo ra chúng. <span className="font-semibold">Chúng tôi là điểm tựa</span>, giúp anh thể hiện trọn vẹn phong thái, khí chất và sẵn sàng cho những điều quan trọng phía trước
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <div className="uppercase font-bold text-base md:text-[26px] mt-5 text-[#15397F] pl-1 border-l-[6px] border-[#A0C9EB]">
                KIỂU TÓC ĐẸP KHÔNG PHẢI ĐÍCH ĐẾN – MÀ LÀ ĐIỂM KHỞI ĐẦU
              </div>
              <div className="text-sm md:text-lg mt-5 text-[#15397F] flex flex-col gap-1">
                <div>Một kiểu tóc đẹp <span className="font-semibold">không chỉ để ngắm nhìn – mà còn để cảm nhận:</span></div>
                <div>Cảm nhận sự <span className="font-semibold">thoải mái, tự tin, sẵn sàng</span></div>
                <div>Cảm nhận một phiên bản <span className="font-semibold">tốt hơn của chính mình</span></div>
                <div>
                  Với gần <span className="font-semibold">100 salon trên toàn quốc</span>, công nghệ hiện đại và đội ngũ thợ tận tâm, HAIR không chỉ mang đến một diện mạo mới.
                  <span className="font-semibold"> Chúng tôi giúp anh luôn trong trạng thái tốt nhất – để đón nhận bất kỳ điều gì đang chờ phía trước</span>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <div className="uppercase font-bold text-base md:text-[26px] mt-5 text-[#15397F] pl-1 border-l-[6px] border-[#A0C9EB]">
                WILLS – VĂN HOÁ TINH THẦN CỦA NHỮNG NGƯỜI DÁM TIẾN LÊN
              </div>
              <div className="text-sm md:text-lg mt-5 text-[#15397F] flex flex-col gap-1">
                <div>Ở HAIR, chúng tôi không chỉ tạo ra diện mạo tuyệt vời – chúng tôi phục vụ những người đàn ông muốn tốt hơn mỗi ngày</div>
                <div>Dù anh đang <span className="font-semibold">bắt đầu, bứt phá hay khẳng định chính mình,</span> tinh thần<span className="font-semibold"> WILLS</span> luôn đồng hành:</div>
                <ul className="list-disc pl-5 !mb-0">
                  <li><span className="font-semibold">W - Warrior</span> (Chiến binh) – Kiên cường, không lùi bước trước thử thách</li>
                  <li><span className="font-semibold">I - Intervention</span> (Can thiệp) – Không đợi thời điểm hoàn hảo, mà tạo ra nó</li>
                  <li><span className="font-semibold">L - Learning</span> (Ham học hỏi) – Phát triển không giới hạn, không ngừng nâng cấp bản thân</li>
                  <li><span className="font-semibold">L - Leadership</span> (Đổi mới) – Luôn sáng tạo, chủ động dẫn đầu sự thay đổi</li>
                  <li><span className="font-semibold">S - Sincerity</span> (Chân thành) – Minh bạch, đáng tin cậy, tạo dựng giá trị bền vững</li>
                </ul>
                <div className="font-semibold mt-2">Không có đúng hay sai – chỉ có phiên bản tốt nhất của chính mình, và HAIR ở đây để giúp anh tự tin thể hiện điều đó</div>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <div className="uppercase font-bold text-base md:text-[26px] mt-5 text-[#15397F] pl-1 border-l-[6px] border-[#A0C9EB]">
                SỨ MỆNH – TÔN VINH ĐÔI BÀN TAY TÀI HOA NGƯỜI THỢ VIỆT
              </div>
              <div className="text-sm md:text-lg mt-5 text-[#15397F] flex flex-col gap-1">
                <div>HAIR không chỉ là điểm tựa giúp đàn ông thể hiện phong độ, mà còn mang trong mình một sứ mệnh lớn hơn:</div>
                <div className="font-semibold">Tôn vinh và nâng tầm đôi bàn tay tài hoa của người thợ Việt trên bản đồ thế giới</div>
                <div>Tay nghề con người Việt Nam không chỉ giỏi – mà có thể vươn xa</div>
                <div>Bằng việc không ngừng đổi mới, nâng cao chất lượng dịch vụ và xây dựng môi trường phát triển chuyên nghiệp, HAIR giúp người thợ Việt phát triển bản thân, nghề nghiệp và vị thế trong ngành tóc toàn cầu</div>
                <div className="font-semibold">Từ bàn tay Việt – vươn tới những tầm cao mới</div>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <div className="uppercase font-bold text-base md:text-[26px] mt-5 text-[#15397F] pl-1 border-l-[6px] border-[#A0C9EB]">
                AI CŨNG CÓ VIỆC LỚN CỦA RIÊNG MÌNH – CHỈ CẦN MỘT ĐIỂM TỰA
              </div>
              <div className="text-sm md:text-lg mt-5 text-[#15397F] flex flex-col gap-1">
                <div>Không có lộ trình nào giống nhau</div>
                <div>Không có đích đến nào là duy nhất</div>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <div className="uppercase font-bold text-base md:text-[26px] mt-5 text-[#15397F] pl-1 border-l-[6px] border-[#A0C9EB]">
                HAIR – ĐIỂM TỰA CHO VIỆC LỚN
              </div>
              <div className="text-sm md:text-lg mt-5 text-[#15397F] flex flex-col gap-1">
                <div>Dù anh đang ở đâu trên hành trình <span className="font-semibold">– chỉ cần sẵn sàng, thế giới này là của anh</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer onOpenRegister={() => {
        // Dispatch custom event to open register modal
        const event = new CustomEvent('openRegisterModal');
        window.dispatchEvent(event);
      }} />
    </div>
  );
};

export default AboutUs;
