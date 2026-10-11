import React from "react";
import { createPortal } from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiClock,
  FiScissors,
  FiFileText,
} from "react-icons/fi";

export interface BookingValues {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

interface BookServiceModalProps {
  isOpen: boolean;
  initialService?: string;
  onClose: () => void;
  onSubmit: (values: BookingValues) => void | Promise<void>;
}

const services = [
  "Wig Installation",
  "Hair Styling",
  "Wig Customization",
  "Hair Braiding",
  "Wig Revamp & Treatment",
  "Bridal Styling Package",
];

const initialValues: BookingValues = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  notes: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is required"),

  phone: Yup.string()
    .matches(/^\+?[0-9\s()-]{10,20}$/, "Enter a valid phone number")
    .required("Phone number is required"),

  service: Yup.string().required("Please select a service"),

  date: Yup.string()
    .required("Appointment date is required")
    .test("future-date", "Choose today or a future date", (value) => {
      if (!value) return false;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(`${value}T00:00:00`);
      return !Number.isNaN(selectedDate.getTime()) && selectedDate >= today;
    }),

  time: Yup.string().required("Appointment time is required"),

  notes: Yup.string().max(500, "Notes cannot exceed 500 characters"),
});

const BookServiceModal: React.FC<BookServiceModalProps> = ({
  isOpen,
  initialService,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#d4af6a] focus:bg-white focus:ring-2 focus:ring-[#d4af6a]/20 sm:text-sm";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  const errorClass = "mt-1 text-xs text-red-500";

  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400";
  const serviceOptions =
    initialService && !services.includes(initialService)
      ? [initialService, ...services]
      : services;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex min-h-[100dvh] items-start justify-center overflow-y-auto overscroll-contain bg-black/50 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-5 sm:py-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-8 sm:py-5">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#b38a45]">
              <FiScissors />
              Salon Appointment
            </div>

            <h2
              id="booking-title"
              className="text-xl font-bold text-gray-900 sm:text-2xl"
            >
              Book a Service
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Fill in your details to schedule your appointment.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking modal"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-50 hover:text-red-500"
          >
            <FiX size={21} />
          </button>
        </div>

        {/* Modal Form */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-7">
          <Formik
            initialValues={{
              ...initialValues,
              service: initialService ?? "",
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                await onSubmit(values);
                resetForm();
                onClose();
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5 sm:space-y-6">
                {/* Customer Information */}
                <section>
                  <h3 className="mb-3 text-base font-bold text-gray-900 sm:mb-4">
                    Customer Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className={labelClass}>
                        Full Name <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <FiUser className={iconClass} size={17} />
                        <Field
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          autoComplete="name"
                          className={`${inputClass} pl-10`}
                        />
                      </div>

                      <ErrorMessage
                        name="fullName"
                        component="p"
                        className={errorClass}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <FiMail className={iconClass} size={17} />
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          className={`${inputClass} pl-10`}
                        />
                      </div>

                      <ErrorMessage
                        name="email"
                        component="p"
                        className={errorClass}
                      />
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <FiPhone className={iconClass} size={17} />
                        <Field
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          autoComplete="tel"
                          className={`${inputClass} pl-10`}
                        />
                      </div>

                      <ErrorMessage
                        name="phone"
                        component="p"
                        className={errorClass}
                      />
                    </div>
                  </div>
                </section>

                {/* Appointment Information */}
                <section className="border-t border-gray-100 pt-5">
                  <h3 className="mb-3 text-base font-bold text-gray-900 sm:mb-4">
                    Appointment Details
                  </h3>

                  <div className="space-y-4">
                    {/* Service */}
                    <div>
                      <label htmlFor="service" className={labelClass}>
                        Select Service <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <FiScissors
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          size={17}
                        />

                        <Field
                          as="select"
                          id="service"
                          name="service"
                          className={`${inputClass} cursor-pointer appearance-none pl-10`}
                        >
                          <option value="">Choose a salon service</option>
                          {serviceOptions.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <ErrorMessage
                        name="service"
                        component="p"
                        className={errorClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Date */}
                      <div>
                        <label htmlFor="date" className={labelClass}>
                          Appointment Date{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                          <FiCalendar className={iconClass} size={17} />
                          <Field
                            id="date"
                            name="date"
                            type="date"
                            min={minDate}
                            className={`${inputClass} pl-10`}
                          />
                        </div>

                        <ErrorMessage
                          name="date"
                          component="p"
                          className={errorClass}
                        />
                      </div>

                      {/* Time */}
                      <div>
                        <label htmlFor="time" className={labelClass}>
                          Appointment Time{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                          <FiClock className={iconClass} size={17} />
                          <Field
                            id="time"
                            name="time"
                            type="time"
                            className={`${inputClass} pl-10`}
                          />
                        </div>

                        <ErrorMessage
                          name="time"
                          component="p"
                          className={errorClass}
                        />
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label htmlFor="notes" className={labelClass}>
                        Additional Notes{" "}
                        <span className="font-normal text-gray-400">
                          (Optional)
                        </span>
                      </label>

                      <div className="relative">
                        <FiFileText
                          className="absolute left-3.5 top-4 text-gray-400"
                          size={17}
                        />
                        <Field
                          as="textarea"
                          id="notes"
                          name="notes"
                          rows={3}
                          maxLength={500}
                          placeholder="Describe your preferred style or any special requests..."
                          className={`${inputClass} resize-none pl-10`}
                        />
                      </div>

                      <ErrorMessage
                        name="notes"
                        component="p"
                        className={errorClass}
                      />
                    </div>
                  </div>
                </section>

                {/* Footer Buttons */}
                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-[#d4af6a] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#bd9650] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? "Booking..." : "Book Appointment"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BookServiceModal;
