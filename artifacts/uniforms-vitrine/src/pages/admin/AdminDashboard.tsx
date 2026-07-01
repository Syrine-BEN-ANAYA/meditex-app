import { Link } from "wouter";

const cards = [
  {
    title: "Textes & Contenu",
    desc: "Modifier les titres, descriptions et textes de chaque section du site",
    href: "/admin/content",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Collections & Produits",
    desc: "Gérer les 6 collections de tenues, leurs titres et images",
    href: "/admin/collections",
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    color: "bg-green-50 text-green-600",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 mt-1">Gérez le contenu de votre site Muscat Meditex</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {cards.map(card => (
          <Link key={card.href} href={card.href}>
            <a className="block bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                </svg>
              </div>
              <h2 className="font-semibold text-gray-900 mb-1 group-hover:text-[var(--color-primary)] transition">{card.title}</h2>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </a>
          </Link>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">Comment ça fonctionne</p>
            <p className="text-sm text-amber-700 mt-1">
              Les modifications que vous effectuez ici sont sauvegardées en base de données et appliquées en temps réel sur le site public. Les images uploadées remplacent les images par défaut.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
