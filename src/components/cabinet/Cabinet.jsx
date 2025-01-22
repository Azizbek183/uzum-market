import React, { useEffect, useState } from 'react';
import "./cabinet.css";

const Cabinet = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    gender: '',
    email: '',
  }); // formani malumotlari uchun xolat

  const [phoneNumber, setPhoneNumber] = useState(''); // telefon raqami uchun holat 
  const [saveStatus, setSaveStatus] = useState(''); // saqlash holati

  useEffect(() => {
    // telefon raqamini localStorage dan olamiz
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
    // qolgan foydalanuvchi malumotlarini localStorage da yuklaymiz
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [phoneNumber]); // phoneNumber uzgarganda yangilash

  // malumotlarni saqlash funksiyasi
  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(formData));
    setSaveStatus('Malumotlar saqlandi');

    // saqlash jarayonini imitatsiya qilish
    setTimeout(() => {
      setSaveStatus('saved');
      // statusni 2 sekunddan keyin qayta tiklash
      setTimeout(() => {
        setSaveStatus('');
      }, 2000);
    }, 500);
  };

  // safarni bekor qilish funksiyasi
  const handleCancel = () => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setFormData(JSON.parse(savedData)); // safarni qayta ishga tushirish
    }
  };

  // tizimdan chiqish funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("userData"); // malumotlarni localStorage dan olib tashlash
    setFormData({
      lastName: '',
      firstName: '',
      middleName: '',
      birthDate: '',
      gender: 'male',
      email: '',
    }); // Formani qayta tiklash
  };

  // knopka uchun matn va klass aniqlash
  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case 'saving':
        return <span>сохранение...</span>;
      case 'saved':
        return <span>сохранено</span>;
      default:
        return <span>Сохранить</span>;
    }
  };

  return (
    <div className='cabinet__container'>
      <div className="cabinet__title">
        <p>{formData.firstName} {formData.lastName}</p> {/* ism va familya */}
      </div>
      <div className="cabinet__card">
        <div className="cabinet__sidebar">
          <p>Mening buyurtmalarim</p>
          <p className='active'>Mening ma'lumotlarim</p>
        </div>
        <div className="cabinet__ticket">
          <h2>Mening malumotlarim</h2>
          <div className="cabinet__form__page">
            <div>
              <label className="required">Familya</label>
              <input type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
            <div>
              <label className="required">Ism</label>
              <input type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div>
              <label>Отчество</label>
              <input type="text"
                value={formData.middleName}
                onChange={(e) => setFormData(prev => ({ ...prev, middleName: e.target.value }))}
              />
            </div>
            <div>
              <label>Tug'ilgan sana</label>
              <input type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
              />
            </div>
            <div>
              <label>Pol</label>
              <div className="cabinet__form__btn">
                <button
                  type='button'
                  className={formData.gender === 'male' ? 'active' : ''}
                  onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                >
                  Erkak
                </button>
                <button
                  type='button'
                  className={formData.gender === 'female' ? 'active' : ''}
                  onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                >
                  Ayol
                </button>
              </div>
            </div>
            <div>
              <label className="required">Elektron pochta</label>
              <input type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="required">Telefon raqam</label>
              <input type="tel"
                value={phoneNumber}
                disabled
                className='disabled-input'
              />
            </div>
          </div>

          <div className="cabinet__form__footer">
            <button className='logout-btn' onClick={handleLogout}>
              Sistemadan chiqish
            </button>

            <div className="cabinet__footer__btn">
              <button onClick={handleSave}
                className={`save-btn ${saveStatus}`}
                disabled={saveStatus === 'saving'}
              >
                {getSaveButtonContent()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cabinet;
