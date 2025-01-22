import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./login.css";

const Login = ({ onClose }) => {
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const handlePhoneSubmit = (data) => {
        console.log(data);
        // telefon raqamni localStorage-ga saqlash
        localStorage.setItem("phoneNumber", data.phoneNumber);
        // kod kiritish bosqichiga o'tish
        setStep(2);
        reset(); // maydonlarni tozalash
    };

    const handleCodeSubmit = (data) => {
        console.log(data);
        // kabinet komponentiga yo'naltirish
        onClose(); // modal oyna yopiladi
        navigate('/cabinet'); // kabinet sahifasiga yo'naltirish
    };

    // telefon raqamni o'zgartirish uchun funksiyasi
    const handleInputChange = (event) => {
        const { value } = event.target;
        if (!value.startsWith("+998")) { // agar raqam +998 bilan boshlanmasa qo'shamiz
            setValue("phoneNumber", "+998");
        } else if (value.length > 13) { // raqamni 13dan oshmasligi
            setValue("phoneNumber", value.slice(0, 13));
        }
    };

    const verificationCode = watch("verificationCode", "");

    return (
        <div className='login__container'>
            <div className="modal">
                <div className="modal-content">
                    <span className='close' onClick={onClose}>
                        &times;
                    </span>
                    {step === 1 ? (
                        <form onSubmit={handleSubmit(handlePhoneSubmit)} className='modal__form'>
                            <p>Telefon raqamingizni kiriting</p>
                            <span>Tasdiqlash kodi bilan SMS yuboramiz</span>
                            <input
                                type="text"
                                name='phoneNumber'
                                placeholder='+998 00 000-00-00'
                                {...register("phoneNumber", {
                                    required: "Telefon raqami kerak",
                                    maxLength: {
                                        value: 13,
                                        message: "Telefon raqami 13 ta belgidan ko'p bo'lmasligi kerak"
                                    },
                                    pattern: {
                                        value: /^\+998[0-9]{9}$/,
                                        message: "Telefon raqami noto'g'ri formatda"
                                    }
                                })}
                                onChange={handleInputChange}
                            />
                            {errors.phoneNumber && <span className="error">{errors.phoneNumber.message}</span>}
                            <button type='submit'>Kodni olish</button>
                            <div className="modal__txt">
                                <span className='modal__form__txt'>Siz avtorizatsiyadan o‘tayapsiz
                                    <span className='modal__from-txt-blue'> Shaxsiy ma'lumotlarni qayta ishlash siyosat</span>
                                </span>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit(handleCodeSubmit)} className='modal__form'>
                            <p>4-raqamli kodni kiriting</p>
                            <span>Biz kodni telefon raqamingizga yubordik</span>
                            <input
                                type="text"
                                name='verificationCode'
                                placeholder='Kodni kiriting'
                                maxLength={4}
                                {...register("verificationCode", { 
                                    required: "Tasdiqlash kodi kerak", 
                                    pattern: {
                                        value: /^[0-9]{4}$/,
                                        message: "Kod faqat raqamlardan iborat bo'lishi kerak"
                                    } 
                                })}
                            />
                            {errors.verificationCode && <span className="error">{errors.verificationCode.message}</span>}
                            <button type='submit' disabled={verificationCode.length !== 4}>Tasdiqlash</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
