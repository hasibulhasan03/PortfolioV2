"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import {
  ARCHITECTURE_DARK,
  ATMOSPHERE_COOL,
  ATMOSPHERE_WARM
} from "@/components/shared/placeholders";

const PROJECT_1_CODE = `// Diagnostic Center — appointment service
import express from "express";
import { z } from "zod";
import { Patient, Appointment } from "../models/index.js";

const router = express.Router();

const Schema = z.object({
  patientId: z.string().uuid(),
  testIds: z.array(z.string()).min(1),
  scheduledFor: z.coerce.date(),
  doctorRef: z.string().optional()
});

router.post("/appointments", async (req, res, next) => {
  try {
    const payload = Schema.parse(req.body);
    const patient = await Patient.findById(payload.patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const conflict = await Appointment.findOne({
      patientId: payload.patientId,
      scheduledFor: payload.scheduledFor
    });
    if (conflict) {
      return res.status(409).json({
        error: "Appointment slot conflict",
        existing: conflict._id
      });
    }
    const appointment = await Appointment.create({
      ...payload,
      status: "PENDING",
      createdAt: new Date()
    });
    return res.status(201).json({ data: appointment });
  } catch (err) {
    next(err);
  }
});`;

const PROJECT_2_CODE = `// Retail POS — checkout aggregator
import { useMemo, useState } from "react";
import { fetchProductsByBarcodes, recordSale } from "@/lib/api";

export function useCheckout(initial = []) {
  const [items, setItems] = useState(initial);
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0.075);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, it) => sum + it.unitPrice * it.qty,
      0
    );
    const discounted = subtotal - discount;
    const tax = +(discounted * taxRate).toFixed(2);
    const grand = +(discounted + tax).toFixed(2);
    return { subtotal, discount, tax, grand };
  }, [items, discount, taxRate]);

  async function scan(barcode) {
    const products = await fetchProductsByBarcodes([barcode]);
    if (!products.length) throw new Error("UNKNOWN_SKU");
    setItems((prev) => {
      const existing = prev.find((p) => p.sku === products[0].sku);
      if (existing) {
        return prev.map((p) =>
          p.sku === existing.sku ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...products[0], qty: 1 }];
    });
  }

  async function tender(method, amount) {
    return recordSale({ items, totals, payment: { method, amount } });
  }

  return { items, totals, scan, tender, setDiscount };
}`;

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current!.querySelectorAll<HTMLElement>("[data-proj-reveal]"),
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
          opacity: 0,
          y: 22,
          filter: "blur(8px)",
          duration: 0.9,
          stagger: 0.06,
          ease: "expo.out"
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative w-full overflow-hidden"
      style={{
        background: "transparent",
        padding: "clamp(5rem, 12vh, 11rem) clamp(1.25rem, 5vw, 5rem)"
      }}
    >
      {/* Backplate */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          top: "8%",
          right: "-2%",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5rem, 18vw, 22rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          lineHeight: 0.82,
          color: "transparent",
          WebkitTextStroke: "1px rgba(240,236,228,0.05)",
          whiteSpace: "nowrap"
        }}
      >
        BUILT
      </div>

      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
      >
        <div
          className="flex justify-between items-end flex-wrap"
          style={{ gap: "1.5rem", marginBottom: "clamp(3rem, 6vw, 5rem)" }}
        >
          <div>
            <span
              data-proj-reveal
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                color: "var(--accent)",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "clamp(1.25rem, 2.5vw, 2rem)"
              }}
            >
              <span
                aria-hidden
                style={{ width: 32, height: 1, background: "var(--accent)" }}
              />
              06 — SELECTED WORK
            </span>
            <h2
              id="projects-heading"
              data-proj-reveal
              className="font-display"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 5rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
                color: "var(--text-pri)"
              }}
            >
              Two systems,{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontWeight: 400
                }}
              >
                written to last.
              </em>
            </h2>
          </div>
          <div
            data-proj-reveal
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "var(--text-sec)",
              textTransform: "uppercase",
              maxWidth: "30ch",
              textAlign: "right"
            }}
          >
            Production builds with real users · 02 case studies
          </div>
        </div>

        <div
          className="flex flex-col"
          style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          <ProjectCard
            number="01"
            category="HEALTHCARE · COURSEWORK"
            title="Diagnostic Center Management System"
            tagline="Patient flow · Appointment scheduling · Reports"
            description="A complete diagnostic management platform with patient registration, appointment scheduling, and digital report tracking to streamline daily operations. Automated data validation, secure record handling, and real-time reporting features."
            stack={["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"]}
            metrics={[
              { label: "STACK", value: "PHP + MYSQL" },
              { label: "MODULES", value: "06" },
              { label: "TYPE", value: "COURSEWORK" }
            ]}
            language="javascript"
            code={PROJECT_1_CODE}
            cover={ARCHITECTURE_DARK}
            githubHref="https://github.com/"
          />
          <ProjectCard
            number="02"
            category="RETAIL · POS"
            title="Retail Inventory & POS Management System"
            tagline="Secure login · POS · Category-based control"
            description="A complete inventory management system featuring secure login, POS, and category-based product control for smooth business operations. Role-based access, faster transactions, and optimized database operations for reliable real-time processing."
            stack={["Java", "Java Swing", "MySQL", "NetBeans"]}
            metrics={[
              { label: "DB", value: "MYSQL" },
              { label: "PLATFORM", value: "JAVA SWING" },
              { label: "FLOWS", value: "REALTIME" }
            ]}
            language="javascript"
            code={PROJECT_2_CODE}
            cover={ATMOSPHERE_WARM}
            githubHref="https://github.com/"
            reverse
          />
        </div>
      </div>
    </section>
  );
}
