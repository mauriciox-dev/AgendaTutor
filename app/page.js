'use client'; 
import React from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {

  // Função que será chamada quando clicar no botão
  async function fazerAgendamento(horario) {
    // 1. Pergunta os dados pro usuário (do jeito mais simples possível)
    const nome = prompt("Para confirmar, digite seu Nome:");
    if (!nome) return; // Se a pessoa cancelar, para tudo.

    const whats = prompt("Digite seu WhatsApp para contato:");
    if (!whats) return;

    // 2. Salva no Supabase (Aqui a mágica acontece!)
    const { error } = await supabase
      .from('agendamentos')
      .insert({ 
        nome_aluno: nome, 
        whatsapp: whats, 
        data_horario: horario 
      });

    // 3. Dá o feedback
    if (error) {
      alert("Ops! Erro ao agendar: " + error.message);
      console.error(error);
    } else {
      alert(`Sucesso! Aula agendada para ${horario}. O professor entrará em contato.`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md text-center">
        <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
          JP
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Professor Erick Correa</h1>
        <p className="text-gray-500">Aulas Particulares de Inglês</p>
      </div>

      <div className="w-full max-w-md mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 ml-2">Horários Disponíveis</h2>
        
        <div className="space-y-3">
          {/* Botão 1 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">Segunda-feira, 25/12</p>
              <p className="text-sm text-gray-500">14:00 - 15:00</p>
            </div>
            <button 
              onClick={() => fazerAgendamento("Segunda, 14h")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              Agendar
            </button>
          </div>

          {/* Botão 2 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">Terça-feira, 26/12</p>
              <p className="text-sm text-gray-500">09:00 - 10:00</p>
            </div>
            <button 
              onClick={() => fazerAgendamento("Terça, 09h")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              Agendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}