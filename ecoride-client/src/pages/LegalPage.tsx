const LegalPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Mentions légales</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Informations légales</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">En vigueur au 21/05/2025</p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">1. Présentation du site</h3>
            <p className="text-gray-700">
              Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site les informations suivantes :
            </p>
            
            <div className="mt-4 pl-4">
              <p className="text-gray-700">
                <strong>Informations légales :</strong><br />
                Nom du site : EcoRide<br />
                Adresse : https://www.ecoride.fr<br />
                Propriétaire : EcoRide SAS<br />
                Adresse : 123 Avenue de l'Écologie - 75001 Paris<br />
                Email : contact@ecoride.fr<br />
                Téléphone : +33 1 23 45 67 89
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">2. Conditions générales d'utilisation</h3>
            <p className="text-gray-700">
              L'utilisation du site EcoRide implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment, sans préavis.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">3. Description des services fournis</h3>
            <p className="text-gray-700">
              Le site EcoRide a pour objet de fournir une plateforme de mise en relation entre conducteurs et passagers pour du covoiturage. EcoRide s'efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">4. Limitations contractuelles</h3>
            <p className="text-gray-700">
              Le site utilise la technologie JavaScript. Le site ne pourra être tenu responsable de dommages matériels liés à l'utilisation du site. De plus, l'utilisateur du site s'engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis à jour.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">5. Propriété intellectuelle et contrefaçons</h3>
            <p className="text-gray-700">
              EcoRide est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels.
            </p>
            <p className="text-gray-700 mt-2">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de EcoRide.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">6. Gestion des données personnelles</h3>
            <p className="text-gray-700">
              En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
            </p>
            <p className="text-gray-700 mt-2">
              EcoRide ne collecte des informations personnelles relatives à l'utilisateur que pour les besoins du service proposé. L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">7. Droit applicable et attribution de juridiction</h3>
            <p className="text-gray-700">
              Tout litige en relation avec l'utilisation du site EcoRide est soumis au droit français. L'utilisateur ainsi que EcoRide acceptent de se soumettre à la compétence exclusive des tribunaux français en cas de litige.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;