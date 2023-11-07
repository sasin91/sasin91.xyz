"use client";

import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Loader } from "lucide-react";

import { Input } from "~/app/_components/ui/input";
import InputError from "~/app/_components/ui/input-error";
import InputLabel from "~/app/_components/ui/input-label";
import { useTranslation } from "~/app/i18n/client";
import type { Lng } from "~/app/i18n/settings";
import { api } from "~/utils/api";

export default function ContactSection({ lang }: { lang: Lng }) {
  const { t } = useTranslation(lang);
  const utils = api.useUtils();
  const { mutateAsync: createContactRequest, error } =
    api.contact.create.useMutation({
      onSuccess() {
        setContactPerson("");
        setCompanyName("");
        setEmail("");
        setPhone("");
        setMessage("");

        setModalOpen(true);

        return utils.invalidate();
      },
    });
  const [modalOpen, setModalOpen] = React.useState(false);

  const [submitting, setSubmitting] = React.useState(false);
  const [contactPerson, setContactPerson] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <div className="bg-gradient-conic at-top to-magenta-100/20 relative isolate mx-auto mt-32 max-w-7xl from-white via-cyan-100/5 px-6 py-24 sm:mt-40 sm:py-32 lg:px-8">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,skyblue,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width="200"
            height="200"
            x="50%"
            y="-64"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-64" className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          {t("contactForm.headline")}
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          {t("contactForm.tagline")}
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              setSubmitting(true);

              try {
                await createContactRequest({
                  contactPerson,
                  companyName,
                  email,
                  phone,
                  message,
                });
              } finally {
                setSubmitting(false);
              }
            }}
            method="POST"
            className="lg:flex-auto"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <InputLabel htmlFor="companyName">
                  {t("contactForm.companyName")}
                </InputLabel>
                <Input
                  type="text"
                  required
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />

                {error?.companyName && (
                  <InputError
                    message={t("form.errors.required", {
                      label: t("contactForm.companyName"),
                    })}
                  />
                )}
              </div>
              <div>
                <InputLabel htmlFor="contactPerson">
                  {t("contactForm.contactPerson")}
                </InputLabel>
                <Input
                  type="text"
                  required
                  autoComplete="fullname"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />

                {error?.contactPerson && (
                  <InputError
                    message={t("form.errors.required", {
                      label: t("contactForm.contactPerson"),
                    })}
                  />
                )}
              </div>
              <div>
                <InputLabel htmlFor="email">
                  {t("contactForm.email")}
                </InputLabel>
                <Input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {error?.email && (
                  <InputError
                    message={t("form.error.required", {
                      label: t("contactForm.email"),
                    })}
                  />
                )}
              </div>
              <div>
                <InputLabel htmlFor="phone">
                  {t("contactForm.phone")}
                </InputLabel>
                <Input
                  type="text"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                {error?.phone && (
                  <InputError
                    message={t("form.error.required", {
                      label: t("contactForm.phone"),
                    })}
                  />
                )}
              </div>
              <div>
                <InputLabel htmlFor="message">
                  {t("contactForm.message")}
                </InputLabel>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {error?.message && (
                  <InputError
                    message={t("form.error.required", {
                      label: t("contactForm.message"),
                    })}
                  />
                )}
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                disabled={submitting}
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {submitting ? <Loader /> : t("contactForm.submit")}
              </button>
            </div>
          </form>
        </div>

        <Transition appear show={modalOpen} as={React.Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setModalOpen(false)}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {t("contactFormSuccessModal.headline")}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {t("contactFormSuccessModal.thanks")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t("contactFormSuccessModal.i_be_back")}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-2xl shadow-purple-400"
                        onClick={() => setModalOpen(false)}
                      >
                        {t("contactFormSuccessModal.close")}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}
