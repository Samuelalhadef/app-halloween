"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { allCharacters } from "@/data/all-characters";
import RelationshipTree from "@/components/RelationshipTree";

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  relatedTerms: string[];
  discoveredAt?: string;
}

interface Character {
  firstName: string;
  lastName: string;
  name: string;
  title: string;
  age: number;
  occupation: string;
  description: string;
  category: string;
}

type SearchResult = {
  type: "article" | "character";
  data: Article | Character;
};

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<"search" | "relationships">(
    "search"
  );

  // Base de données d'articles
  const articles: Article[] = [
    {
      id: "digitoxine",
      title: "Digitoxine - Poison Cardiaque",
      category: "Toxicologie",
      relatedTerms: [
        "digitoxine",
        "poison",
        "cardiaque",
        "digitaline",
        "digitale",
        "foxglove",
        "médicament",
        "cœur",
        "fiole",
        "flacon",
      ],
      content: `
# Digitoxine (C41H64O13)

## Description Générale
La digitoxine est un glycoside cardiotonique extrait de la plante *Digitalis purpurea* (digitale pourpre).
Utilisée en médecine pour traiter l'insuffisance cardiaque, elle devient mortellement toxique à doses élevées.

## Propriétés Pharmacologiques

### Usage Médical
- **Indication thérapeutique** : Insuffisance cardiaque congestive, arythmies
- **Dose thérapeutique** : 0.1-0.2 mg par jour
- **Dose létale** : 20-50 mg (environ 100-200 comprimés)

### Mécanisme d'Action
La digitoxine augmente la force de contraction du muscle cardiaque en inhibant la pompe sodium-potassium.
À doses toxiques, elle provoque des arythmies ventriculaires fatales.

## Symptômes d'Intoxication

### Phase Précoce (30 min - 2h)
- Nausées et vomissements persistants
- Vision troublée, halos colorés (jaunes/verts)
- Confusion mentale, désorientation
- Faiblesse généralisée

### Phase Tardive (2-6h)
- Bradycardie sévère (pouls < 40 bpm)
- Arythmies ventriculaires
- Convulsions
- **Arrêt cardiaque** (mort en 4-6 heures)

## Détection et Analyse

### Tests de Laboratoire
- **Dosage sanguin** : Détectable 15-30 minutes après ingestion
- **Électrocardiogramme** : Anomalies caractéristiques du segment ST
- **Autopsie** : Concentration myocardique élevée

### Indices Matériels
- Traces résiduelles dans les verres, tasses, ou flacons
- Comprimés écrasés ou dissous
- Plantes de digitale dans le jardin

## Disponibilité en 1925

### Sources Médicales
- Prescriptions médicales courantes pour affections cardiaques
- Pharmacies et apothicaires
- Cabinets médicaux

### Sources Naturelles
- **Digitale pourpre** : Plante ornementale commune dans les jardins anglais
- Toutes les parties de la plante sont toxiques
- Extraction possible par infusion ou macération

## Aspects Criminels

### Avantages pour le Criminel
✓ Inodore et sans goût prononcé
✓ Soluble dans l'alcool et les liquides
✓ Symptômes peuvent ressembler à une crise cardiaque naturelle
✓ Facile d'accès en 1925
✓ Délai d'action permettant au meurtrier de disparaître

### Désavantages
✗ Détectable à l'autopsie chimique
✗ Symptômes caractéristiques (vision jaune/verte)
✗ Nécessite une dose importante (plusieurs comprimés)
✗ Traçable via registres pharmaceutiques

## Cas Célèbres
- **Affaire Crippen** (1910) : Bien que la hyoscine fut utilisée, la digitoxine fut considérée
- Plusieurs empoisonnements domestiques dans l'Angleterre victorienne

## Contre-Mesures (1925)
- Lavage gastrique immédiat
- Charbon activé
- Atropine pour contrer la bradycardie
- Surveillance cardiaque continue

---

**Note d'enquête** : Si la digitoxine est le poison utilisé, cherchez :
1. Qui avait accès à des médicaments cardiaques ?
2. Qui possède des connaissances en pharmacologie ou botanique ?
3. Y a-t-il des plants de digitale dans le jardin du manoir ?
4. Le médecin de famille prescrivait-il ce médicament ?
      `,
      discoveredAt: "Bibliothèque - Traité de toxicologie",
    },
    {
      id: "poison-general",
      title: "Poisons Courants en 1925",
      category: "Toxicologie",
      relatedTerms: [
        "poison",
        "toxique",
        "venin",
        "arsenic",
        "cyanure",
        "strychnine",
        "empoisonnement",
      ],
      content: `
# Poisons Courants dans l'Angleterre de 1925

## Poisons Facilement Accessibles

### 1. Arsenic (As)
- **Source** : Mort-aux-rats, papier peint, insecticides
- **Symptômes** : Vomissements, diarrhée, crampes abdominales
- **Détection** : Test de Marsh (très fiable en 1925)

### 2. Strychnine
- **Source** : Mort-aux-rats, médicaments toniques
- **Symptômes** : Convulsions violentes, spasmes musculaires
- **Délai** : 15-30 minutes

### 3. Cyanure
- **Source** : Insecticides, photographie, bijouterie
- **Symptômes** : Mort rapide (minutes), odeur d'amande amère
- **Facilement détectable** à l'autopsie

### 4. Digitoxine ⭐
- **Source** : Médicaments cardiaques, plante digitale
- **Avantage criminel** : Ressemble à une mort naturelle
- **Délai** : 4-6 heures

## Méthodes d'Administration
- Dans la nourriture ou boissons
- Injection (rare, laisse des traces)
- Inhalation (certains poisons volatils)

## Détection en 1925
Les méthodes médico-légales de 1925 permettent de détecter la plupart des poisons connus,
rendant l'empoisonnement un crime risqué pour le meurtrier.
      `,
    },
    {
      id: "flacon-medicament",
      title: "Flacon de Médicament Suspect",
      category: "Indice Matériel",
      relatedTerms: [
        "flacon",
        "fiole",
        "bouteille",
        "médicament",
        "pharmacie",
        "apothicaire",
        "comprimé",
      ],
      content: `
# Flacon de Médicament Retrouvé

## Description de l'Indice
Un petit flacon en verre ambré a été retrouvé dans les quartiers des domestiques,
caché derrière une étagère dans l'office.

### Caractéristiques Physiques
- **Contenant** : Verre ambré de 30ml
- **Étiquette** : Partiellement arrachée, on peut lire "...oxine" et "POISON"
- **Contenu** : Vide, mais traces de poudre blanche au fond
- **Provenance** : Étiquette de la pharmacie Thorne & Sons

## Analyse

### Informations Pharmaceutiques
L'étiquette partielle suggère un médicament en "-oxine", possiblement :
- **Digitoxine** (cardiaque) ⭐ PROBABLE
- Dioxine (peu courant en 1925)
- Proxine (n'existe pas)

### Marquage "POISON"
En 1925, la loi anglaise impose un marquage "POISON" pour toutes substances mortelles.
La digitoxine entre dans cette catégorie.

## Signification Criminelle

### Questions d'Enquête
1. **Qui avait accès aux quartiers des domestiques ?**
2. **Pourquoi cacher ce flacon ?** (Si usage légitime, pourquoi le dissimuler ?)
3. **Qui a des liens avec la pharmacie Thorne ?**
4. **À qui appartenait ce médicament à l'origine ?**

### Hypothèses
- Le meurtrier a caché le flacon après avoir versé le poison
- La pharmacie Thorne garde un registre des ventes (vérifiable !)
- Les empreintes digitales peuvent être relevées sur le verre

## Liens avec d'Autres Indices
- Si la victime montre des symptômes de digitoxine, ce flacon est LA PREUVE
- L'apothicaire Silas Thorne pourrait avoir des informations
- Vérifier si Lord Ashford prenait des médicaments cardiaques

---

**Action recommandée** : Interroger l'apothicaire et les domestiques ayant accès à l'office.
      `,
    },
    {
      id: "digitale-jardin",
      title: "Plants de Digitale dans le Jardin",
      category: "Indice Botanique",
      relatedTerms: [
        "digitale",
        "jardin",
        "fleur",
        "plante",
        "pourpre",
        "foxglove",
        "végétal",
        "toxique",
      ],
      content: `
# Digitale Pourpre (Digitalis purpurea) - Jardin d'Ashford

## Observation
Des plants de digitale pourpre ont été observés dans le jardin du manoir Ashford,
près de la serre. Certaines tiges montrent des signes de coupe récente.

### Description Botanique
- **Nom commun** : Digitale pourpre, Gant de Notre-Dame
- **Hauteur** : 1-2 mètres
- **Fleurs** : Pourpres, en forme de cloche, disposées en épi
- **Floraison** : Juin-Septembre
- **Toxicité** : ⚠️ TOUTES LES PARTIES SONT MORTELLEMENT TOXIQUES

## Toxicité

### Principes Actifs
- Digitoxine (concentration maximale dans les feuilles)
- Digitaline
- Gitoxine

### Préparation Toxique
**Méthode d'extraction simple :**
1. Récolter 20-30 feuilles fraîches
2. Broyer finement
3. Macérer dans alcool pendant 24h
4. Filtrer → Obtention d'un extrait mortel

**Dose létale** : Équivalent de 5-10 grammes de feuilles fraîches

## Indices Criminels

### Observations Suspectes
- ✓ Plusieurs tiges coupées récemment (1-2 jours)
- ✓ Traces de terre fraîche près du banc du jardin
- ✓ Le jardinier George Thornton affirme ne pas avoir coupé ces fleurs

### Personnes avec Accès
- **George Thornton** - Jardinier en chef
- **Margaret Walsh** - Cuisinière (connaissances en plantes aromatiques)
- **Membres de la famille** - Accès libre au jardin
- **Invités** - Promenade dans les jardins pendant la soirée

## Connaissances Botaniques

### Qui pourrait savoir ?
- Personnes éduquées en botanique
- Cuisiniers/herboristes (usage médicinal traditionnel)
- Médecins et apothicaires
- Lecteurs de traités de jardinage (plusieurs dans la bibliothèque d'Ashford)

## Lien avec le Crime

Si Lord Ashford a été empoisonné à la digitoxine, ces plants constituent :
- **La SOURCE du poison** (alternative aux médicaments)
- **Preuve de préméditation** (récolte récente)
- **Connaissance spécialisée** du meurtrier

---

**Action recommandée** :
1. Interroger le jardinier sur les coupes récentes
2. Vérifier si quelqu'un a été vu près des plants
3. Chercher des traces de feuilles séchées ou broyées
      `,
    },
    {
      id: "registre-pharmacie",
      title: "Registre de la Pharmacie Thorne",
      category: "Document",
      relatedTerms: [
        "registre",
        "pharmacie",
        "thorne",
        "achat",
        "prescription",
        "apothicaire",
        "commande",
      ],
      content: `
# Registre des Ventes - Pharmacie Thorne & Sons

## Document Officiel
Registre obligatoire des ventes de substances toxiques et médicaments contrôlés,
conformément au Pharmacy Act de 1868 et au Poisons and Pharmacy Act de 1908.

## Entrées Récentes (Octobre 1925)

### Digitoxine - Ventes du Mois

**12 Octobre 1925**
- **Acheteur** : Dr. Arthur Finch
- **Quantité** : 100 comprimés (10mg)
- **Usage déclaré** : Patient cardiaque
- **Signature** : Dr. A. Finch

**18 Octobre 1925**
- **Acheteur** : Albert Whitmore (Majordome)
- **Quantité** : 50 comprimés (10mg)
- **Usage déclaré** : "Pour Lord Ashford, prescription Dr. Finch"
- **Signature** : A. Whitmore

**25 Octobre 1925** ⚠️
- **Acheteur** : [Signature illisible]
- **Quantité** : 30 comprimés (10mg)
- **Usage déclaré** : [Non renseigné]
- **Signature** : [Griffonnage suspect]
- **Note de Silas Thorne** : "Paiement comptant, client pressé"

## Analyse Criminelle

### Transaction Suspecte du 25 Octobre
- **Date** : 3 jours avant le meurtre
- **Signature illisible** : Tentative de dissimulation ?
- **Usage non déclaré** : Violation du protocole
- **Client pressé** : Comportement suspect

### Questions d'Enquête
1. Qui était le client du 25 octobre ?
2. Silas Thorne peut-il identifier cette personne ?
3. Pourquoi Albert Whitmore achetait-il de la digitoxine ?
4. Le Dr. Finch a-t-il réellement prescrit ce médicament ?

### Hypothèses Criminelles

**Scénario 1** : Achat direct par le meurtrier
- Le meurtrier a acheté la digitoxine le 25 octobre
- A tenté de masquer son identité
- Préméditation claire (3 jours avant)

**Scénario 2** : Complicité du majordome
- Albert Whitmore a acheté pour quelqu'un d'autre
- Possible manipulation ou chantage
- Accès légitime aux médicaments de Lord Ashford

**Scénario 3** : Implication du Dr. Finch
- Prescriptions suspectes
- État d'ébriété habituel → erreurs ?
- Possible négligence criminelle

## Dose Létale

**Calcul** :
- Dose létale : 20-50mg (2-5 comprimés de 10mg suffisent)
- Quantité achetée le 25/10 : 30 comprimés = 300mg
- **Largement suffisant pour tuer plusieurs personnes**

## Témoignage de Silas Thorne

L'apothicaire déclare :
> "Le client du 25 était nerveux, portait un chapeau enfoncé.
> Voix étouffée. A payé rapidement et est parti sans un mot.
> Je n'ai pas pu voir son visage clairement."

### Détails Physiques Mentionnés
- Taille : Moyenne
- Vêtements : Sombres, de qualité
- Mains : Gantées (inhabituel pour la saison)

---

**INDICE MAJEUR** : Ce registre prouve l'achat récent de la substance mortelle.
Identifier le client du 25 octobre = Identifier le meurtrier (ou complice).
      `,
    },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const query = searchQuery.toLowerCase().trim();

    // Recherche dans les personnages
    let characterResults: SearchResult[];

    // Si on recherche "personnages" ou "suspects", afficher tous les personnages
    if (query === "personnages" || query === "suspects") {
      characterResults = allCharacters.map((character) => ({
        type: "character" as const,
        data: character,
      }));
    } else {
      // Sinon, filtrer par prénom, nom de famille, nom complet, titre ou occupation
      characterResults = allCharacters
        .filter((character) => {
          return (
            character.firstName.toLowerCase().includes(query) ||
            character.lastName.toLowerCase().includes(query) ||
            character.name.toLowerCase().includes(query) ||
            character.title.toLowerCase().includes(query) ||
            character.occupation.toLowerCase().includes(query) ||
            character.category.toLowerCase().includes(query)
          );
        })
        .map((character) => ({ type: "character" as const, data: character }));
    }

    // Recherche dans les articles
    const articleResults: SearchResult[] = articles
      .filter((article) => {
        return (
          article.relatedTerms.some(
            (term) =>
              term.toLowerCase().includes(query) ||
              query.includes(term.toLowerCase())
          ) || article.title.toLowerCase().includes(query)
        );
      })
      .map((article) => ({ type: "article" as const, data: article }));

    // Combiner les résultats
    const allResults = [...characterResults, ...articleResults];
    setSearchResults(allResults);
    setHasSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0e0d] via-[#1a2420] to-[#0f1512]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Ornamental Corners */}
      <div className="absolute top-0 left-0 w-48 h-48 border-l-2 border-t-2 border-accent-gold/30 opacity-50"></div>
      <div className="absolute top-0 right-0 w-48 h-48 border-r-2 border-t-2 border-accent-gold/30 opacity-50"></div>

      <div className="relative z-10 min-h-screen px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header - Search Engine Style */}
          <div className="text-center mb-8">
            <h1 className="font-playfair text-6xl font-bold text-accent-gold mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              ASHFORD ARCHIVES
            </h1>
            <p className="font-inter text-text-muted text-sm tracking-widest mb-8">
              MOTEUR DE RECHERCHE • MANOIR ASHFORD 1925
            </p>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab("search")}
                className={`px-8 py-3 rounded-lg font-inter font-semibold transition-all ${
                  activeTab === "search"
                    ? "bg-accent-gold text-primary-dark shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                    : "bg-accent-gold/10 text-accent-gold border-2 border-accent-gold/30 hover:bg-accent-gold/20"
                }`}
              >
                🔍 Recherche
              </button>
              <button
                onClick={() => setActiveTab("relationships")}
                className={`px-8 py-3 rounded-lg font-inter font-semibold transition-all ${
                  activeTab === "relationships"
                    ? "bg-accent-gold text-primary-dark shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                    : "bg-accent-gold/10 text-accent-gold border-2 border-accent-gold/30 hover:bg-accent-gold/20"
                }`}
              >
                👥 Relations
              </button>
            </div>

            {/* Search Bar - Large and Centered */}
            {activeTab === "search" && (
              <>
                <div className="max-w-3xl mx-auto mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher : Margaret, Ashford, domestiques, suspects, poison..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-full px-8 py-6 pl-16 pr-32 text-text-light font-inter text-lg placeholder-text-muted focus:outline-none focus:border-accent-gold/60 focus:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all backdrop-blur-sm"
                    />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl">
                      🔍
                    </span>
                    <button
                      onClick={handleSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent-gold hover:bg-accent-gold/80 text-primary-dark font-playfair font-semibold px-8 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                    >
                      Rechercher
                    </button>
                  </div>
                </div>

                {/* Quick Suggestions */}
                {!hasSearched && (
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="font-inter text-text-muted text-sm">
                      Suggestions :
                    </span>
                    {[
                      "personnages",
                      "suspects",
                      "domestiques",
                      "Ashford",
                      "Pemberton",
                      "Margaret",
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          setTimeout(() => {
                            handleSearch();
                          }, 100);
                        }}
                        className="px-4 py-2 bg-accent-gold/10 border border-accent-gold/30 rounded-full text-accent-gold text-sm font-inter hover:bg-accent-gold/20 hover:border-accent-gold/50 transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Relationship Tree Tab */}
          {activeTab === "relationships" && <RelationshipTree />}

          {/* Search Results */}
          {activeTab === "search" && hasSearched && (
            <div>
              {/* Results Count */}
              <div className="mb-6 font-inter text-text-muted">
                {searchResults.length > 0
                  ? `${searchResults.length} résultat${
                      searchResults.length > 1 ? "s" : ""
                    } trouvé${searchResults.length > 1 ? "s" : ""}`
                  : "Aucun résultat trouvé"}
              </div>

              {/* Results List */}
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  {searchResults.map((result, index) => {
                    if (result.type === "character") {
                      const character = result.data as Character;
                      return (
                        <div
                          key={`character-${index}`}
                          className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-8 shadow-[0_0_40px_rgba(212,175,55,0.2)] backdrop-blur-sm hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] hover:border-accent-gold/60 transition-all duration-300"
                        >
                          {/* Character Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">👤</span>
                                <h2 className="font-playfair text-3xl font-bold text-accent-gold">
                                  {character.name}
                                </h2>
                              </div>
                              <div className="flex items-center gap-4 text-sm mb-3">
                                <span className="font-inter text-accent-gold px-3 py-1 bg-accent-gold/10 rounded-full border border-accent-gold/30">
                                  {character.title}
                                </span>
                                <span className="font-inter text-text-muted">
                                  {character.occupation}
                                </span>
                                <span className="font-inter text-text-muted">
                                  {character.age} ans
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Character Content */}
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-playfair text-xl text-accent-gold mb-2">
                                Description
                              </h3>
                              <p className="font-inter text-text-gray leading-relaxed">
                                {character.description}
                              </p>
                            </div>
                          </div>

                          {/* Character Footer */}
                          <div className="mt-6 pt-4 border-t border-accent-gold/30 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-text-muted font-inter">
                              <span>🎭 {character.category}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      const article = result.data as Article;
                      return (
                        <div
                          key={`article-${article.id}`}
                          className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-8 shadow-[0_0_40px_rgba(212,175,55,0.2)] backdrop-blur-sm hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] hover:border-accent-gold/60 transition-all duration-300"
                        >
                          {/* Article Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">📄</span>
                                <h2 className="font-playfair text-3xl font-bold text-accent-gold">
                                  {article.title}
                                </h2>
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="font-inter text-text-muted px-3 py-1 bg-accent-gold/10 rounded-full border border-accent-gold/30">
                                  {article.category}
                                </span>
                                {article.discoveredAt && (
                                  <span className="font-inter text-text-muted flex items-center gap-1">
                                    📍 {article.discoveredAt}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Article Content */}
                          <div className="prose prose-invert max-w-none">
                            <div
                              className="font-inter text-text-gray leading-relaxed whitespace-pre-line"
                              style={{
                                fontSize: "0.95rem",
                                lineHeight: "1.7",
                              }}
                            >
                              {article.content}
                            </div>
                          </div>

                          {/* Article Footer */}
                          <div className="mt-6 pt-4 border-t border-accent-gold/30 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-text-muted font-inter">
                              <span>🏷️ Mots-clés :</span>
                              <span>
                                {article.relatedTerms.slice(0, 5).join(", ")}
                              </span>
                            </div>
                            <button className="font-inter text-sm text-accent-gold hover:text-accent-gold/80 transition-colors flex items-center gap-2">
                              <span>📋</span>
                              Ajouter aux notes
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                // No Results
                <div className="bg-gradient-to-br from-[#1a2420]/80 to-[#0f1512]/90 border-2 border-accent-gold/40 rounded-lg p-16 text-center shadow-[0_0_40px_rgba(212,175,55,0.2)] backdrop-blur-sm">
                  <span className="text-8xl mb-6 block opacity-50">🔎</span>
                  <h3 className="font-playfair text-2xl font-bold text-text-light mb-3">
                    Aucun résultat trouvé
                  </h3>
                  <p className="font-inter text-text-muted mb-6">
                    Essayez avec des mots-clés différents comme :<br />
                    <span className="text-accent-gold">
                      personnages, Margaret, Ashford, domestiques, suspects,
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setHasSearched(false);
                    }}
                    className="font-inter text-sm text-accent-gold hover:text-accent-gold/80 transition-colors"
                  >
                    ← Nouvelle recherche
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Back Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/game")}
              className="font-inter text-text-muted text-sm hover:text-accent-gold transition-colors flex items-center gap-2 mx-auto"
            >
              <span>←</span>
              Retour au jeu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
