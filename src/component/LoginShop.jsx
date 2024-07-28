export default function LoginShop({ getUserProfile }) {
  return (
    <div className="login-shop">
      <form className="form-login" onSubmit={getUserProfile}>
        <input
          name="email"
          className="input-email"
          type="email"
          placeholder="Enter your email"
        />
        <button className="btn-login">Login</button>
      </form>
    </div>
  );
}
