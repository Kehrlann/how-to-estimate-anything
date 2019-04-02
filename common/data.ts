import { QuestionWithAnswer } from './models';

export const getQuestions = (): QuestionWithAnswer[] => [
  {
    id: 1,
    text:
      "Si vous sautiez d'un avion de ligne en plein vol, combien de temps mettriez-vous à atteindre le sol, en secondes ?",
    answer: 60,
    source:
      'https://www.quora.com/If-you-jumped-out-of-a-plane-at-10-000-feet-how-long-would-it-take-to-hit-the-ground'
  },
  {
    id: 2,
    text:
      "L'expédition norvégienne de Roald Amundsen a été la première à atteindre le Pôle Sud. En quelle année ?",
    answer: 1911,
    source: 'https://fr.wikipedia.org/wiki/Exp%C3%A9dition_Amundsen'
  },
  {
    id: 3,
    text:
      'Quel masse de déchets produit en moyenne un Français chaque année (en kilogrammes) ?',
    answer: 513,
    source:
      'https://www.planetoscope.com/dechets/148-production-de-dechets-menagers-en-france.html'
  },
  {
    id: 4,
    text: "Combien d'étages y a-t-il dans la Tour Montparnasse ?",
    answer: 58,
    source: 'https://fr.wikipedia.org/wiki/Tour_Montparnasse'
  },
  {
    id: 5,
    text: 'Quelle est la superficie de la Chine (km carrés) ?',
    answer: 9596961,
    source: 'https://en.wikipedia.org/wiki/China'
  },
  {
    id: 6,
    text: "Combien y avait-il d'employés chez Spotify en février 2019 ?",
    answer: 4165,
    source: 'https://en.wikipedia.org/wiki/Spotify'
  },
  {
    id: 7,
    text: "Quel était le taux de succès de projets dans l'IT en 2015 (%) ?",
    answer: 29,
    source: 'https://www.infoq.com/articles/standish-chaos-2015'
  },
  {
    id: 8,
    text:
      'Combien de pertes (morts, capturés ou blessés) y a-t-il eu dans le camp Soviétique à la bataille de Stalingrad ?',
    answer: 1280000,
    source: 'https://fr.wikipedia.org/wiki/Bataille_de_Stalingrad'
  },
  {
    id: 9,
    text:
      'Quelle est la durée de Stairway to Heaven de Led Zeppelin (en minutes) ?',
    answer: 8,
    source: 'https://fr.wikipedia.org/wiki/Stairway_to_Heaven'
  },
  {
    id: 10,
    text:
      "Combien de rois et d'empereurs ont régné en France depuis l'an 1000 ?",
    answer: 38,
    source: 'https://fr.geneawiki.com/index.php/Liste_des_rois_de_France'
  },
  {
    id: 11,
    text:
      "Quelle est la consommation moyenne d'une voiture en France en 2007 (litres par 100km) ?",
    answer: 6.37,
    source:
      'https://fr.statista.com/statistiques/486554/consommation-de-carburant-moyenne-voiture-france/'
  },
  {
    id: 12,
    text:
      'De combien de centimètres poussent les cheveux en moyenne par an (estimation basse) ?',
    answer: 9,
    source: 'https://fr.wikipedia.org/wiki/Cheveu'
  },
  {
    id: 13,
    text:
      "Quelle était la consommation calorique moyenne d'un adulte en France en 2006 ?",
    answer: 3530,
    source:
      'https://en.wikipedia.org/wiki/List_of_countries_by_food_energy_intake'
  },
  {
    id: 14,
    text: "Combien d'années a duré la construction de Notre-Dame de Paris ?",
    answer: 182,
    source: 'https://fr.wikipedia.org/wiki/Cath%C3%A9drale_Notre-Dame_de_Paris'
  },
  {
    id: 15,
    text: "Quelle est l'année de création d'Astérix le Gaulois ?",
    answer: 1959,
    source: 'https://fr.wikipedia.org/wiki/Ast%C3%A9rix'
  },
  {
    id: 16,
    text: 'Combien de pièces Molière a-t-il écrites ?',
    answer: 33,
    source: 'https://fr.wikipedia.org/wiki/Moli%C3%A8re#Liste_des_pi%C3%A8ces'
  },
  {
    id: 17,
    text: "Combien de kilomètres d'autoroute y avait-il en France en 2014 ?",
    answer: 11882,
    source:
      'https://fr.wikipedia.org/wiki/R%C3%A9seau_autoroutier_fran%C3%A7ais'
  },
  {
    id: 18,
    text: 'Quelle est la masse à vide du plus gros avion A340, en tonnes ?',
    answer: 182,
    source: 'https://fr.wikipedia.org/wiki/Airbus_A340'
  },
  {
    id: 19,
    text: "Combien d'oscars a reçu le film Ben-Hur de William Wyler (1960) ?",
    answer: 11,
    source:
      'http://www.douane.gouv.fr/articles/a14588-la-production-de-vin-en-france-en-2017'
  },
  {
    id: 20,
    text:
      'Combien de millions de bouteilles de vins ont été produites en France en 2017 ?',
    answer: 4750,
    source:
      'http://www.douane.gouv.fr/articles/a14588-la-production-de-vin-en-france-en-2017'
  }

  // x géographie
  // ? histoire: batailles
  // ? technologie (ex: minuteman missile)
  // x socio: nombre d'employés de tel boîte, nombre d'emplois à pourvoir
  // x taux d'échecs de projets dans l'IT
  // x coût moyen des tests (ou de la maintenance) dans l'IT ?
  // ? nombre de défaut / ligne de code
  // x musique: durée d'une chanson ?
  // x histoire: nombre de rois Français ?
  // ? sports
  // ? année ou nombre d'oscars d'un film
  // x consommation moyenne véhicule
  // ? prix immobilier
  // x centimètres croissance cheveux / an
  // x consommation calorique / jour
  // ? taille du désert du sahara carré -> quel côté
  // ? plus grosse météorite
  // x taille des pyramides de Gizeh
  // x année de naissance d'Astérix
  // x nombre de pièces écrites par molière
  // ? date de naissance de différents personnages historiques
  // ? le ième nom le plus donné en telle ou telle année (pour les garçons, romain, 3ème en 1988 ; thomas, 7ème en 1988)
  // ? barrage des trois vallées en chine: quelle taille ? quelle production électrique (185m, 98TWh, soit 20800 foyers Français)
  // x combien de km d'autoroute en france (9 112 km)
  // combien de kilomètres de rail en france (2 651 km, décembre 2017)
  // x population de Grenoble (158 180 en 2016)
  // x poids d'une locomotive TGV / d'un Airbus xyz
  // x combien de bouteilles de vin sont produites en france par an
];
