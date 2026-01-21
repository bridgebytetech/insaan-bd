import { Users, Clock, CheckCircle } from "lucide-react";

export default function OrphanStats({ total, pending, approved }: any) {
  const cards = [
    { label: "মোট এতিম", value: total, icon: Users, color: "#2A9D8F", desc: "নিবন্ধিত সকল শিশু" },
    { label: "পেন্ডিং", value: pending, icon: Clock, color: "#E76F51", desc: "যাচাইকরণের অপেক্ষায়" },
    { label: "এপ্রুভড", value: approved, icon: CheckCircle, color: "#264653", desc: "সক্রিয় প্রোফাইলসমূহ" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-[#2A9D8F]/10 transition-all duration-500 border border-gray-50 flex flex-col items-center text-center">
          <div 
            className="mb-4 p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            style={{ backgroundColor: `${card.color}15`, color: card.color }}
          >
            <card.icon size={28} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-[#264653] tracking-tighter">{card.value}</span>
            <span className="text-[#2A9D8F] font-bold">+</span>
          </div>
          <h3 className="text-[10px] font-black text-[#264653] uppercase tracking-[0.2em] mt-2">{card.label}</h3>
          <p className="text-gray-400 text-xs mt-1">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}