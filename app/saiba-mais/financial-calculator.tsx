"use client";

import React, { useState, useRef, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ReferenceLine, Label, ResponsiveContainer } from "recharts";
import { DollarSign, PiggyBank, Briefcase, HeartPulse, CakeSlice, Calculator, Target, CalendarClock, CalendarCheck, TrendingUp, Info } from "lucide-react";
import { calculateFinancials } from "@/lib/financial-calculator";
import type { FinancialData, ChartDataPoint, Insights } from "@/lib/types";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
};

const formatChartCurrency = (value: number) => {
  if (Math.abs(value) >= 1e6) return `R$ ${(value / 1e6).toFixed(1)}M`;
  if (Math.abs(value) >= 1e3) return `R$ ${(value / 1e3).toFixed(0)}k`;
  return formatCurrency(value);
};

export function FinancialCalculator() {
  const [data, setData] = useState<FinancialData>({
    initialInvestment: 10000,
    currentAge: 30,
    retirementAge: 65,
    desiredMonthlyIncome: 5000,
    expectedLifespan: 90,
  });

  const [results, setResults] = useState<{ chartData: ChartDataPoint[], insights: Insights } | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateFinancials(data);
    setResults(res);
    setTimeout(() => {
      chartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleChange = (name: keyof FinancialData, value: string) => {
    const num = parseFloat(value.replace(/\D/g, "")) || 0;
    setData(prev => ({ ...prev, [name]: num }));
  };

  if (!mounted) return null;

  return (
    <div className="calc-container">
      <div className="calc-header">
        <h2 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '16px' }}>Sua Jornada Financeira</h2>
        <p style={{ fontSize: '18px', color: 'rgba(0,0,0,0.6)', maxWidth: '700px', margin: '0 auto' }}>
          Descubra o caminho exato para sua liberdade. Insira seus dados abaixo e visualize sua projeção de patrimônio e renda vitalícia.
        </p>
      </div>

      <div className="calc-grid">
        {/* Left Column: Form Card */}
        <div className="calc-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#744e60', display: 'flex', alignItems: 'center', color: '#fff', justifyContent: 'center' }}>
              <Calculator size={20} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Configurações</h3>
          </div>
          
          <form onSubmit={handleCalculate}>
            <div className="calc-input-group">
              <label className="calc-label">Investimento Inicial</label>
              <div className="calc-input-wrapper">
                <PiggyBank size={20} />
                <input 
                  type="text" 
                  value={data.initialInvestment.toLocaleString('pt-BR')} 
                  onChange={(e) => handleChange('initialInvestment', e.target.value)}
                />
              </div>
            </div>

            <div className="calc-input-group">
              <label className="calc-label">Renda Mensal Desejada</label>
              <div className="calc-input-wrapper">
                <DollarSign size={20} />
                <input 
                  type="text" 
                  value={data.desiredMonthlyIncome.toLocaleString('pt-BR')} 
                  onChange={(e) => handleChange('desiredMonthlyIncome', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="calc-input-group">
                <label className="calc-label">Idade Atual</label>
                <div className="calc-input-wrapper">
                  <CakeSlice size={20} />
                  <input 
                    type="number" 
                    value={data.currentAge} 
                    onChange={(e) => setData(prev => ({ ...prev, currentAge: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="calc-input-group">
                <label className="calc-label">Aposentadoria</label>
                <div className="calc-input-wrapper">
                  <Briefcase size={20} />
                  <input 
                    type="number" 
                    value={data.retirementAge} 
                    onChange={(e) => setData(prev => ({ ...prev, retirementAge: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
            </div>

            <div className="calc-input-group">
              <label className="calc-label">Expectativa de Vida</label>
              <div className="calc-input-wrapper">
                <HeartPulse size={20} />
                <input 
                  type="number" 
                  value={data.expectedLifespan} 
                  onChange={(e) => setData(prev => ({ ...prev, expectedLifespan: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <button type="submit" className="calc-btn-primary">
              <Calculator size={22} />
              Gerar Estudo Completo
            </button>
          </form>
        </div>

        {/* Right Column: Results & Dashboard */}
        <div ref={chartRef}>
          {results ? (
            <div style={{ animation: 'cfFadeInUp 0.6s ease-out' }}>
              {/* Insight Cards Grid */}
              <div className="calc-insight-grid">
                <div className="calc-insight-card">
                  <div className="icon"><Target size={20} /></div>
                  <h4>Patrimônio Alvo</h4>
                  <p>{formatCurrency(results.insights.nestEggNeeded)}</p>
                </div>
                
                <div className="calc-insight-card">
                  <div className="icon"><PiggyBank size={20} /></div>
                  <h4>Poupança Mensal</h4>
                  <p>{formatCurrency(results.insights.monthlySavingsNeeded)}</p>
                </div>

                <div className="calc-insight-card">
                  <div className="icon"><CalendarClock size={20} /></div>
                  <h4>Tempo Restante</h4>
                  <p>{results.insights.totalYearsToSave} anos</p>
                </div>

                <div className="calc-insight-card">
                  <div className="icon"><CalendarCheck size={20} /></div>
                  <h4>Usufruto Total</h4>
                  <p>{results.insights.totalYearsInRetirement} anos</p>
                </div>
              </div>

              {/* Chart Card */}
              <div className="calc-chart-card">
                <div className="calc-chart-header">
                  <h3 className="calc-chart-title">Curva da Vida Financeira</h3>
                  <p className="calc-chart-subtitle">Evolução do seu patrimônio projetada até os {data.expectedLifespan} anos.</p>
                </div>
                
                <div style={{ height: '400px', width: '100%', position: 'relative' }}>
                  {results.chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#744e60" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#744e60" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(0,0,0,0.05)" />
                        <XAxis 
                          dataKey="age" 
                          stroke="rgba(0,0,0,0.3)" 
                          fontSize={11} 
                          tickLine={false} 
                          axisLine={false}
                          dy={10}
                        />
                        <YAxis 
                          tickFormatter={formatChartCurrency} 
                          stroke="rgba(0,0,0,0.3)" 
                          fontSize={11} 
                          tickLine={false} 
                          axisLine={false}
                          dx={-10}
                        />
                        <Tooltip 
                          cursor={{ stroke: '#744e60', strokeWidth: 2, strokeDasharray: '6 6' }}
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: 'none', 
                            borderRadius: '16px', 
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            padding: '12px 16px'
                          }}
                          itemStyle={{ color: '#744e60', fontWeight: 'bold' }}
                          formatter={(value: any) => [formatCurrency(Number(value || 0)), "Patrimônio"]}
                          labelFormatter={(label) => `Aos ${label} anos`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="wealth" 
                          stroke="#744e60" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#chartGradient)" 
                          isAnimationActive={true}
                        />
                      </AreaChart>
                    </ResponsiveContainer>


                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(0,0,0,0.3)' }}>
                      Sem dados para exibir. Verifique as idades informadas.
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: '#744e60' }}>
                        <Info size={14} />
                        <span>Simulação baseada em rendimento real de 6% a.a.</span>
                    </div>
                    <p style={{ fontSize: '11px', opacity: 0.5 }}>© Vanessa Ortega | Planejamento Financeiro</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="calc-placeholder">
              <div style={{ opacity: 0.4 }}>
                <TrendingUp size={48} style={{ marginBottom: '16px', color: '#744e60' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Seu Estudo Personalizado</h3>
                <p style={{ maxWidth: '300px', margin: '0 auto' }}>Preencha os dados ao lado para gerar sua curva da vida financeira.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
