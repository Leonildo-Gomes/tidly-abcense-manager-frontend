"use client";

import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    id: "free",
    href: "/register?plan=free",
    priceMonthly: "$0",
    description: "Perfect for small teams getting started.",
    features: [
      "Up to 5 employees",
      "Basic absence tracking",
      "Email support",
      "Company Calendar",
    ],
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "pro",
    href: "/register?plan=pro",
    priceMonthly: "$29",
    description: "Advanced features for growing businesses.",
    features: [
      "Up to 50 employees",
      "Advanced reporting",
      "Slack integration",
      "Priority support",
      "Custom absence types",
      "Department management",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "enterprise",
    href: "/register?plan=enterprise",
    priceMonthly: "Custom",
    description: "Dedicated support and infrastructure for large scale.",
    features: [
      "Unlimited employees",
      "SSO Authentication",
      "Dedicated account manager",
      "Custom SLA",
      "API Access",
      "Audit logs",
    ],
    mostPopular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Choose the right plan for your team
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Simple, transparent pricing that grows with you. Try any plan free for 14 days.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl bg-card p-8 ring-1 ring-input xl:p-10 ${
                tier.mostPopular ? "ring-2 ring-primary shadow-xl shadow-primary/10" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={`text-lg font-semibold leading-8 ${
                      tier.mostPopular ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {tier.priceMonthly}
                  </span>
                  {tier.priceMonthly !== "Custom" && (
                    <span className="text-sm font-semibold leading-6 text-muted-foreground">
                      /month
                    </span>
                  )}
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  tier.mostPopular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                    : "bg-white text-primary ring-1 ring-inset ring-primary/20 hover:ring-primary/30"
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
