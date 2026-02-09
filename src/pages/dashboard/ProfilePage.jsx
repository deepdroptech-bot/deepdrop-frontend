import { useEffect, useState } from "react"
import DashboardLayout from "../../components/dashboard/Layout"
import api from "../../services/api"
import { BouncyButton } from "../../components/BouncyButton"
import { motion } from "framer-motion"
import { useAuth } from "../../context/AuthContext"

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    api.get("/auth/me").then(res => {
      setForm(f => ({
        ...f,
        name: res.data.name,
        email: res.data.email
      }))
    })
  }, [])

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      await api.put("/auth/me", form)
      setMessage({ type: "success", text: "Profile updated successfully" })
      setForm(f => ({ ...f, password: "", confirmPassword: "" }))
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.msg || "Update failed"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout title="My Profile">
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-xl bg-white p-8 rounded-3xl shadow-xl border"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="space-y-5">
          <Input label="Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />

          <Input label="New Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <Input label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
        </div>

        {message && (
          <p
            className={`mt-4 font-semibold ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="mt-6">
          <BouncyButton isLoading={loading} size="lg">
            Save Changes
          </BouncyButton>
        </div>
      </motion.form>
    </DashboardLayout>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-bold mb-1 text-gray-600">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none"
      />
    </div>
  )
}

// const { logout } = useAuth();

// <button onClick={logout}>Logout</button>
