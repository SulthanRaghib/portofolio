"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "./context/language-context";
import emailjs from "emailjs-com";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    const form = e.target as HTMLFormElement;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );

      setIsSuccess(true);
      form.reset();

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Terjadi kesalahan saat mengirim pesan. Coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
            {language === "EN" ? "Get In Touch" : "Hubungi Saya"}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {language === "EN"
              ? "I'm always interested in new opportunities and exciting projects. Whether you have a question, want to work together, or just want to say hello, I'd love to hear from you."
              : "Saya selalu tertarik dengan peluang baru dan proyek menarik. Apakah Anda memiliki pertanyaan, ingin bekerja sama, atau hanya ingin menyapa, saya akan senang mendengar dari Anda."}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Email</h4>
              <p className="text-muted-foreground">
                sulthan.raghib09@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">
                {language === "EN" ? "Phone" : "Telepon"}
              </h4>
              <p className="text-muted-foreground">+62 857-2188-3952</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">
                {language === "EN" ? "Location" : "Lokasi"}
              </h4>
              <p className="text-muted-foreground">
                Jakarta Selatan, Indonesia
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Response Time</h4>
          <p className="text-muted-foreground">
            I typically respond within 24 hours. For urgent inquiries, please
            contact me via phone or LinkedIn.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading font-bold text-xl">
            {language === "EN" ? "Send a Message" : "Kirim Pesan"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200">
                  {language === "EN" ? "Message sent!" : "Pesan terkirim!"}
                </p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  {language === "EN"
                    ? "Thank you for your message. I'll get back to you soon."
                    : "Terima kasih atas pesan Anda. Saya akan segera menghubungi Anda."}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {language === "EN" ? "First Name" : "Nama Depan"}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {language === "EN" ? "Last Name" : "Nama Belakang"}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {language === "EN" ? "Email" : "Email"}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                {language === "EN" ? "Subject" : "Subjek"}
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Project Inquiry"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                {language === "EN" ? "Message" : "Pesan"}
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or how I can help..."
                required
                className="min-h-[120px] resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {language === "EN" ? "Sending..." : "Mengirim..."}
                </>
              ) : (
                <>
                  {language === "EN" ? "Send Message" : "Kirim Pesan"}
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
