"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSuccess(true);
    setIsSubmitting(false);

    const form = e.target as HTMLFormElement;
    form.reset();

    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
            Get In Touch
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            I&apos;m always interested in new opportunities and exciting
            projects. Whether you have a question, want to work together, or
            just want to say hello, I&apos;d love to hear from you.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Email</h4>
              <p className="text-muted-foreground">john@example.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Phone</h4>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Location</h4>
              <p className="text-muted-foreground">San Francisco, CA</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Response Time</h4>
          <p className="text-muted-foreground">
            I typically respond to messages within 24 hours. For urgent
            inquiries, feel free to reach out via phone or LinkedIn.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading font-bold text-xl">
            Send a Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200">
                  Message sent!
                </p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Thank you for your message. I&apos;ll get back to you soon.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Project Inquiry"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or how I can help you..."
                required
                className="w-full min-h-[120px] resize-none"
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
                  Sending...
                </>
              ) : (
                <>
                  Send Message
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
