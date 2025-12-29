'use client'; 
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  // --- ESTADOS (A memória do componente) ---
  const [modalAberto, setModalAberto] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false); // Para mostrar "Enviando..."

  // Função para abrir a janelinha
  function abrirModal(horario) {
    setHorarioSelecionado(horario);
    setModalAberto(true);
  }

  // Função para fechar e limpar
  function fecharModal() {
    setModalAberto(false);
    setNome('');
    setWhatsapp('');
    setLoading(false);
  }

  // Função que envia pro Supabase de verdade
  async function confirmarAgendamento() {
    if (!nome || !whatsapp) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    setLoading(true); // Ativa o modo de espera

    const { error } = await supabase
      .from('agendamentos')
      .insert({ 
        nome_aluno: nome, 
        whatsapp: whatsapp, 
        data_horario: horarioSelecionado 
      });

    if (error) {
      alert("Erro ao agendar: " + error.message);
      setLoading(false);
    } else {
      alert(`✅ Sucesso! Agendado para ${horarioSelecionado}.`);
      fecharModal();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 relative">
      
      {/* --- O SITE NORMAL --- */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md text-center">
        <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
          JP
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Professor João Paulo</h1>
        <p className="text-gray-500">Aulas Particulares de Inglês</p>
      </div>

      <div className="w-full max-w-md mt-6 px-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Horários Disponíveis</h2>
        
        <div className="space-y-3">
          {/* Botão 1 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">Segunda-feira, 25/12</p>
              <p className="text-sm text-gray-500">14:00 - 15:00</p>
            </div>
            <button 
              onClick={() => abrirModal("Segunda, 14h")}
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
              onClick={() => abrirModal("Terça, 09h")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              Agendar
            </button>
          </div>
        </div>
      </div>

      {/* --- O MODAL (Janela que aparece por cima) --- */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-bounce-in">
            
            <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmar Aula</h3>
            <p className="text-gray-600 mb-4">Você escolheu: <span className="font-semibold text-blue-600">{horarioSelecionado}</span></p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Seu Nome Completo</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Maria Silva"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Seu WhatsApp</label>
                <input 
                  type="tel" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={fecharModal}
                  className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">
                  Cancelar
                </button>
                <button 
                  onClick={confirmarAgendamento}
                  disabled={loading}
                  className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition shadow-lg disabled:bg-gray-400">
                  {loading ? 'Enviando...' : 'Confirmar'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}