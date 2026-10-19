# 🚗 AutoHub - Nền Tảng Giao Dịch Ô Tô & Phụ Kiện Trực Tuyến

> **Môn học:** Lập Trình WWW Java (ThS. Nguyễn Vũ Lâm)  
> **Lớp:** DHKTPM19ATT - **Nhóm:** 7  
> **Trường:** Đại học Công nghiệp TP.HCM (IUH)

---

## 📖 Giới thiệu dự án
**AutoHub** là nền tảng số hợp nhất hai khối nghiệp vụ đặc thù trên môi trường Desktop Web:
1. **Showroom Ô tô kỹ thuật số:** Tra cứu xe, bảng đối đầu so sánh xe đa cột, công cụ dự toán lăn bánh theo tỉnh/thành phố, đặt lịch lái thử (xe Demo) và tính năng **Đặt cọc giữ xe trực tuyến 72h** tích hợp VNPay.
2. **Sàn thương mại điện tử phụ kiện:** Tra cứu phụ kiện tương thích theo từng đời xe, quản lý giỏ hàng thông minh, trừ kho an toàn (@Transactional).
3. **Trợ lý ảo AI:** Tích hợp mô hình ngôn ngữ lớn (Google Gemini API) theo cơ chế Function Calling tư vấn xe thông minh theo nhu cầu.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

### Frontend
- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling & UI:** Tailwind CSS, Shadcn UI, Lucide Icons
- **State Management:** Zustand, React Hook Form, Zod Schema
- **Data Visualization:** Chart.js

### Backend & Database
- **Core:** Java 21 LTS, Spring Boot 3.x
- **Security:** Spring Security 6 (Stateless JWT, RBAC)
- **Database:** Microsoft SQL Server (3NF, Soft Delete, Indexing)
- **Migration & ORM:** Flyway, Spring Data JPA / Hibernate

### Tích hợp bên thứ ba (Third-party)
- **Payment Gateway:** VNPay (HMAC-SHA512, IPN Webhook)
- **Mail Relay:** Gmail SMTP Relay (@Async)
- **AI Service:** Google Gemini API (Function Calling)

---

## 👥 Thành viên nhóm 7

| STT | MSSV | Họ và tên | Vai trò |
| :---: | :---: | :--- | :--- |
| 1 | 23724561 | Trần Đức Nam | Trưởng nhóm |
| 2 | 23645971 | Nguyễn Văn Quốc | Thành viên |
| 3 | 23728381 | Nguyễn Văn Trọng | Thành viên |
| 4 | 23651831 | Trần Nam Sơn | Thành viên |
| 5 | 23649011 | Nguyễn Đỗ Anh Kiệt | Thành viên |

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy (Local Development)

### 1. Yêu cầu môi trường
- Java 21 LTS
- Node.js 18+ & npm/pnpm
- MS SQL Server 2019+

### 2. Cài đặt Backend
```bash
git clone [https://github.com/TrongDavid614/autohub-ecommerce-platform.git](https://github.com/TrongDavid614/autohub-ecommerce-platform.git)
cd autohub-backend
# Cấu hình application.yml (Database, VNPay, Mail, Gemini API Key)
./mvnw clean install
./mvnw spring-boot:run