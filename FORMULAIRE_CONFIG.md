# Configuration du Formulaire de Contact

Le formulaire de contact utilise un script PHP simple qui envoie les emails directement depuis votre serveur. **Aucun service externe requis!**

## Avantages de cette solution

✅ **100% autonome** - Pas de dépendance à un service tiers
✅ **Gratuit** - Aucun quota ou limitation
✅ **Privé** - Vos données restent sur votre serveur
✅ **Personnalisable** - Contrôle total sur le code
✅ **Professionnel** - Emails envoyés depuis votre domaine

## Prérequis

Votre hébergement doit avoir:
- **PHP 7.0+** (la plupart des hébergements l'ont)
- **Fonction mail()** activée (standard sur la plupart des hébergeurs)

## Configuration

### 1. Fichiers nécessaires

Les fichiers sont déjà prêts:
- `send-email.php` - Script PHP qui gère l'envoi
- `index.html` - Formulaire configuré pour pointer vers `send-email.php`
- `script.js` - Gestion de l'envoi AJAX

### 2. Personnaliser l'email de destination

Ouvrez `send-email.php` et modifiez la ligne 48:

```php
// Adresse email de destination
$to = 'contact@conception-ea.fr';  // Changez ici si besoin
```

### 3. Upload sur votre serveur

Uploadez tous les fichiers sur votre serveur web via FTP/SFTP:
- Utilisez FileZilla, WinSCP, ou votre panneau d'hébergement
- Uploadez dans le dossier racine (public_html, www, ou htdocs)

### 4. Tester le formulaire

1. Accédez à votre site web
2. Remplissez le formulaire de contact
3. Cliquez sur "Envoyer"
4. Vérifiez votre boîte mail `contact@conception-ea.fr`

## Fonctionnalités incluses

- ✅ Validation côté client (JavaScript)
- ✅ Validation côté serveur (PHP)
- ✅ Protection contre les injections
- ✅ Nettoyage des données (strip_tags, sanitize)
- ✅ Messages d'erreur détaillés
- ✅ Message de succès avec confettis 🎊
- ✅ Badge "Communicateur" débloqué
- ✅ Réinitialisation automatique du formulaire

## Sécurité

Le script PHP inclut:
- Validation des champs requis
- Validation du format email
- Nettoyage des données avec `strip_tags()` et `filter_var()`
- Protection XSS
- Headers sécurisés
- Vérification de la méthode POST

## Dépannage

### Le formulaire ne s'envoie pas

1. **Vérifiez que PHP est activé** sur votre hébergement
2. **Vérifiez les permissions** du fichier `send-email.php` (chmod 644)
3. **Consultez les logs PHP** de votre hébergeur

### L'email n'arrive pas

1. **Vérifiez vos spams/courriers indésirables**
2. **Vérifiez que la fonction mail() est activée** chez votre hébergeur
3. **Contactez votre hébergeur** - certains requièrent une configuration SMTP
4. **Alternative**: Utilisez PHPMailer avec SMTP (voir ci-dessous)

## Alternative: SMTP avec PHPMailer

Si la fonction `mail()` ne fonctionne pas, vous pouvez utiliser SMTP avec PHPMailer:

1. Téléchargez PHPMailer: https://github.com/PHPMailer/PHPMailer
2. Remplacez le contenu de `send-email.php` par une configuration SMTP
3. Utilisez les identifiants SMTP de votre hébergeur

Je peux vous fournir le code SMTP si nécessaire!

## Test en local

Pour tester en local sur Windows:

1. Installez XAMPP: https://www.apachefriends.org/
2. Placez les fichiers dans `C:\xampp\htdocs\`
3. Démarrez Apache depuis le panneau XAMPP
4. Accédez à http://localhost/

**Note**: L'envoi d'email ne fonctionnera pas en local sans configuration SMTP.

## Comparaison avec les services externes

| Critère | PHP (send-email.php) | EmailJS | Formspree |
|---------|---------------------|---------|-----------|
| **Coût** | Gratuit | 200/mois gratuit | 100/mois gratuit |
| **Autonomie** | ✅ Total | ❌ Dépendant | ❌ Dépendant |
| **Vie privée** | ✅ Privé | ⚠️ Tiers | ⚠️ Tiers |
| **Quota** | ♾️ Illimité | 200/mois | 100/mois |
| **Configuration** | ⚙️ Simple | 🔧 Complexe | ⚙️ Moyenne |

## Support

Si vous rencontrez des problèmes:
1. Vérifiez la console du navigateur (F12)
2. Consultez les logs PHP de votre hébergeur
3. Contactez le support de votre hébergeur web

Le formulaire est prêt à l'emploi dès que vous l'uploadez sur votre serveur! 🚀