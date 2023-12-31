import React, { useState } from 'react';
import './CreateDoctor.css';
import axios from 'axios';

function AdminCreateDoctor() {
    const [error, setError] = useState(null);
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        idCard: '',
        gender: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        address: '',
    });

    const [professionalInfo, setProfessionalInfo] = useState({
        qualification: '',
        experience: '',
    });
    
    const [accountInfo, setAccountInfo] = useState({
        password: '',
    });
    
    const [avatar, setAvatar] = useState(null);
    
    const handlePersonalChange = (event) => {
        const { name, value } = event.target;
        setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };
    
    const handleProfessionalChange = (event) => {
        const { name, value } = event.target;
        setProfessionalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };
    
    const handleAccountChange = (event) => {
        const { name, value } = event.target;
        setAccountInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file);
    };
    
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Chuyển đổi hình ảnh sang base64
        let avatarData = null;
        if (avatar) {
            avatarData = await convertImageToBase64(avatar);
        }
    
        // Xử lý gửi form với dữ liệu đã chuyển đổi
        const formData = {
            personalInfo,
            professionalInfo,
            accountInfo,
            avatar: avatarData,
        };
    
        // Gửi dữ liệu đến server hoặc xử lý theo yêu cầu của bạn
        axios.post('http://localhost:3000/api/admin/createdoctor', formData)
        .then(response => {
          alert(response.data);
          // Xử lý kết quả từ server
        })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.data && error.response.data.error) {
            setError(error.response.data.error);
          } else {
            setError('Có lỗi xảy ra khi gửi yêu cầu đến server');
          }
        });
        console.log(formData);
    };

    return (
        <div className="form1">
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Hồ sơ bác sĩ</h2>
                <h3>Thông tin cá nhân</h3>
                {error !== null && <div className="error">{error}</div>}
                

                <label htmlFor="fullName">Họ và tên:</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handlePersonalChange}
                    placeholder="Nhập tên"
                />

                <label htmlFor="idCard">CMND/CCCD:</label>
                <input
                    type="text"
                    id="idCard"
                    name="idCard"
                    value={personalInfo.idCard}
                    onChange={handlePersonalChange}
                    placeholder="Nhập CMND/CCCD"
                />

                <label htmlFor="gender">Giới tính:</label>
                <div className="gender-options">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Nam"
                            checked={personalInfo.gender === 'Nam'}
                            onChange={handlePersonalChange}
                        />
                        Nam
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Nữ"
                            checked={personalInfo.gender === 'Nữ'}
                            onChange={handlePersonalChange}
                        />
                        Nữ
                    </label>
                </div>

                <label htmlFor="dateOfBirth">Ngày sinh:</label>
                <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={personalInfo.dateOfBirth}
                    onChange={handlePersonalChange}
                />

                <label htmlFor="phone">Số điện thoại:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalChange}
                    placeholder="Nhập số điện thoại"
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalChange}
                    placeholder="Nhập email"
                />

                <label htmlFor="address">Địa chỉ:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalChange}
                    placeholder="Nhập địa chỉ"
                />

                <h3>Thông tin chuyên môn</h3>

                <label htmlFor="qualification">Bằng cấp:</label>
                <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={professionalInfo.qualification}
                    onChange={handleProfessionalChange}
                    placeholder="Nhập bằng cấp"
                />

                <label htmlFor="experience">Kinh nghiệm:</label>
                <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={professionalInfo.experience}
                    onChange={handleProfessionalChange}
                    placeholder="Nhập kinh nghiệm"
                />

                <h3>Thông tin tài khoản</h3>

                <label htmlFor="password">Mật khẩu:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={accountInfo.password}
                    onChange={handleAccountChange}
                    placeholder="Nhập mật khẩu"
                />

                <label htmlFor="avatar">Chọn hình ảnh:</label>
                <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                {avatar && (
                    <div>
                        <p>Đã chọn ảnh: {avatar.name}</p>
                        <img src={URL.createObjectURL(avatar)} alt="Avatar Preview" />
                    </div>
                )}

                <div className="action-buttons">
                    <button type="submit">Xác nhận thông tin</button>
                </div>
            </form>
        </div>
    );
}

export default AdminCreateDoctor;
