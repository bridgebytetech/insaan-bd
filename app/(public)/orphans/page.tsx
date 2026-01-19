import { Search, MapPin, User, ChevronRight, Heart } from "lucide-react";

export default function OrphanPage({ searchParams }) {
  const searchTerm = searchParams?.q || "";

  const orphans = [
    {
      id: 1,
      name: "রাফসান আহমেদ",
      age: 8,
      location: "সিলেট",
      gender: "MALE",
      donorName: "আহমেদ জুবায়ের",
      status: "Sponsored",
    },
    {
      id: 2,
      name: "মারিয়া আক্তার",
      age: 6,
      location: "ঢাকা",
      gender: "FEMALE",
      donorName: null,
      status: "Needs Support",
    },
    {
      id: 3,
      name: "তানভীর হাসান",
      age: 10,
      location: "চট্টগ্রাম",
      gender: "MALE",
      donorName: null,
      status: "Needs Support",
    },
    {
      id: 4,
      name: "সুমাইয়া জান্নাত",
      age: 7,
      location: "বরিশাল",
      gender: "FEMALE",
      donorName: "ফাতেমা বেগম",
      status: "Sponsored",
    },
  ];

  const filteredOrphans = orphans.filter((o) =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#ECF5E8] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto mt-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-[#264653] tracking-tight">
              আমাদের নক্ষত্ররা
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              সহায়তা প্রত্যাশী শিশুদের তালিকা
            </p>
          </div>

          {/* Search Form (Server Side) */}
          <form className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
              size={18}
            />
            <input
              type="text"
              name="q"
              defaultValue={searchTerm}
              placeholder="নাম দিয়ে খুঁজুন..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#2A9D8F]/20 outline-none text-sm transition-all"
            />
          </form>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOrphans.map((child) => (
            <div
              key={child.id}
              className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div
                className={`aspect-square rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden ${
                  child.gender === "MALE" ? "bg-[#E0F2F1]" : "bg-[#FCE4EC]"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full border-4 border-white/50 flex items-center justify-center ${
                    child.gender === "MALE"
                      ? "text-[#2A9D8F]"
                      : "text-[#E76F51]"
                  }`}
                >
                  <User size={32} fill="currentColor" opacity={0.3} />
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm bg-white ${
                      child.donorName ? "text-[#2A9D8F]" : "text-[#E76F51]"
                    }`}
                  >
                    {child.donorName ? "Sponsored" : "Needs Support"}
                  </span>
                </div>
              </div>

              <div className="space-y-1 mb-5">
                <h3 className="font-black text-[#264653] text-lg truncate">
                  {child.name}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                  <span>{child.age} বছর</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span>{child.gender === "MALE" ? "বালক" : "বালিকা"}</span>
                </div>

                <div className="h-4">
                  {child.donorName && (
                    <p className="text-[10px] text-[#2A9D8F] font-bold flex items-center gap-1">
                      <Heart size={10} fill="currentColor" /> দাতা:{" "}
                      {child.donorName}
                    </p>
                  )}
                </div>
              </div>

              <button className="w-full py-3 bg-gray-50 group-hover:bg-[#264653] group-hover:text-white text-[#264653] rounded-xl text-[11px] font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-1">
                See Details <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {filteredOrphans.length === 0 && (
          <div className="text-center py-20 text-gray-300 font-bold uppercase tracking-widest">
            Data Not Found
          </div>
        )}
      </div>
    </div>
  );
}
