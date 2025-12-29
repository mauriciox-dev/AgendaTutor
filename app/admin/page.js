'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados assim que a página carrega
  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    // Busca tudo da tabela 'agendamentos', ordenado pelos mais novos
    const { data, error } = await supabase
      .from('agendamentos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar:', error);
    } else {
      setAgendamentos(data);
    }
    setLoading(false);
  }

  // Função para abrir o WhatsApp direto
  function abrirZap(numero) {
    // Remove parênteses e traços, deixa só números
    const numeroLimpo = numero.replace(/\D/g, ''); 
    window.open(`https://wa.me/55${numeroLimpo}`, '_blank');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Painel do Professor 🎓</h1>

        {loading ? (
          <p className="text-gray-500">Carregando agendamentos...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {agendamentos.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Nenhum agendamento ainda.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600">Aluno</th>
                    <th className="p-4 font-semibold text-gray-600">Horário</th>
                    <th className="p-4 font-semibold text-gray-600">Contato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {agendamentos.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-800">{item.nome_aluno}</td>
                      <td className="p-4 text-blue-600 font-bold">{item.data_horario}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => abrirZap(item.whatsapp)}
                          className="text-sm bg-green-100 text-green-700 py-1 px-3 rounded-full hover:bg-green-200 transition flex items-center gap-2">
                          📱 {item.whatsapp}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}