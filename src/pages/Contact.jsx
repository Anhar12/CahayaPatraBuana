import MainLayout from "../layout/MainLayout"

function Contact() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        Feel free to contact us through the form below.
      </p>

      <form className="grid gap-4 max-w-md">
        <input 
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input 
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <textarea 
          placeholder="Message"
          className="border p-2 rounded h-32"
        ></textarea>

        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
        >
          Send
        </button>
      </form>
    </MainLayout>
  )
}

export default Contact
