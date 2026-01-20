import React from "react";

const ContactSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Origin</h2>
          <p className="text-gray-700 leading-relaxed">
            We are a part of Upanagar Shikshan Mandal (USM), a pioneering
            educational trust in the western suburbs of Mumbai. Commencing in
            1956, USM has blossomed into educational institutes impacting
            quality education from primary school to Post-Graduate courses.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Reach us at</h2>
          <p className="text-gray-700">
            <strong>Authorized Training Centre</strong>
            <br />
            5th Floor, Vidyanidhi Education Complex,
            <br />
            Vidyanidhi Road, Juhu Scheme Andheri (W),
            <br />
            Mumbai 400 049 India
            <br />
            <br />
            <strong>Mobile:</strong> 9829435311 / 9324095272 / 9987062416
            <br />
            <strong>Email:</strong> training@vidyanidhi.com
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-12">
        <div className="w-full h-[350px] border rounded-lg overflow-hidden">
          <iframe
            title="SM VITA Location"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.906025253093!2d72.83000797442975!3d19.11177815084987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c3a5e26d7b%3A0x89a89f343cff9c29!2sSM%20VITA!5e0!3m2!1sen!2sin!4v1768888547731"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Get in Touch With Us !
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name*"
              className="w-full border px-4 py-2"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-2"
            />

            <textarea
              placeholder="Message"
              rows="5"
              className="w-full border px-4 py-2"
            ></textarea>

            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 hover:bg-red-700"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
