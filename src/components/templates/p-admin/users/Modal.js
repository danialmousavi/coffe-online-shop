import styles from "@/styles/modal.module.css";

export default function Modal({ isOpen, onClose, onSubmit, user }) {
  if (!isOpen || !user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
    };
    onSubmit(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.header}>ویرایش کاربر</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" name="username" defaultValue={user.name} placeholder="نام کاربری" className={styles.input} />
          <input type="email" name="email" defaultValue={user.email} placeholder="ایمیل" className={styles.input} />
          <input type="password" name="password" placeholder="رمز عبور (جدید)" className={styles.input} />
          <input type="text" name="phone" defaultValue={user.phone} placeholder="شماره موبایل" className={styles.input} />
          <button type="submit" className={styles.submitBtn}>ذخیره</button>
        </form>
      </div>
    </div>
  );
}
