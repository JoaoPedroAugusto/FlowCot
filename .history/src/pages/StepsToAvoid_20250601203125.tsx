import SectionHeader from '../components/SectionHeader';

const PassosParaEvitar = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <SectionHeader 
        title="Passos para Evitar" 
        subtitle="Aprenda sobre armadilhas comuns e como prevenir lacunas de produtividade"
      />
      
      <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
        {/* Erros Comuns */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Erros Comuns a Evitar</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="border-l-4 border-red-500 pl-3 sm:pl-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Manejo Inadequado do Solo</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Negligenciar a saúde do solo e o manejo adequado de nutrientes pode impactar significativamente a produtividade.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3 sm:pl-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Momento Inadequado</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Plantio ou colheita em momentos não ideais podem levar à redução de produtividade.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Manejo Hídrico Inadequado</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Tanto o excesso quanto a falta de irrigação podem causar lacunas significativas de produtividade.
              </p>
            </div>
          </div>
        </div>

        {/* Estratégias de Prevenção */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Estratégias de Prevenção</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Monitoramento Regular</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Implemente práticas consistentes de monitoramento para identificar problemas precocemente.
              </p>
            </div>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Decisões Baseadas em Dados</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Utilize dados agrícolas e análises para tomar decisões agrícolas informadas.
              </p>
            </div>
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Consultoria Especializada</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Consulte regularmente especialistas agrícolas e serviços de extensão rural.
              </p>
            </div>
            <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Integração Tecnológica</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Adote soluções tecnológicas apropriadas para melhor gestão da propriedade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassosParaEvitar;