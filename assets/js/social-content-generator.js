/**
 * Social Media Content Generator
 * Generate shareable content snippets with proper formatting and UTM tracking
 */

(function() {
  'use strict';

  const SocialContentGenerator = {
    
    /**
     * Generate social media post templates
     */
    generatePost: function(config) {
      const defaults = {
        platform: 'instagram', // instagram, tiktok, facebook, twitter
        type: 'package', // package, artist, testimonial, event, general
        data: {}
      };
      
      const settings = { ...defaults, ...config };
      
      switch (settings.type) {
        case 'package':
          return this.generatePackagePost(settings);
        case 'artist':
          return this.generateArtistPost(settings);
        case 'testimonial':
          return this.generateTestimonialPost(settings);
        case 'event':
          return this.generateEventPost(settings);
        case 'general':
          return this.generateGeneralPost(settings);
        default:
          return null;
      }
    },

    /**
     * Generate package promotion post
     */
    generatePackagePost: function(settings) {
      const pkg = settings.data;
      const platform = settings.platform;
      
      const templates = {
        instagram: {
          caption: `✨ ${pkg.name || 'Special Package'} ✨

${pkg.description || 'Transform your special day with live opera performances'}

What's Included:
${this.formatFeatures(pkg.features || [])}

📍 Available throughout the Southeast
💍 Perfect for weddings, corporate events, and celebrations
🎵 Professional opera singers with years of experience

💬 DM us or visit the link in bio to book!

#AriaAmore #LiveOpera #WeddingMusic #OperaSinger #WeddingEntertainment #LiveMusic #ClassicalMusic #CharlestonWeddings #SouthCarolinaWeddings #LuxuryWedding #WeddingPlanning #EventMusic`,
          
          story: `🎭 ${pkg.name || 'Special Package'}

${pkg.price || 'Custom Pricing'}

Swipe up to book! 👆`,

          link: this.buildUTMLink(platform, 'story', `package_${this.slugify(pkg.name || 'special')}`)
        },
        
        tiktok: {
          caption: `Making wedding dreams come true! 💍✨ 

${pkg.name || 'Our packages'} start at ${pkg.price || 'custom pricing'}

#weddingmusic #liveopera #weddingsinger #operasinger #classicalmusic #weddingentertainment #charlestonwedding #southcarolina #luxurywedding #weddingvibes #fyp #foryou`,
          
          cta: `Link in bio to book! 🔗`,
          
          link: this.buildUTMLink(platform, 'bio', `package_${this.slugify(pkg.name || 'special')}`)
        },
        
        facebook: {
          post: `🎭 ${pkg.name || 'Special Package'} 🎭

${pkg.description || 'Experience world-class live opera at your event'}

✨ What You Get:
${this.formatFeatures(pkg.features || [])}

Perfect for:
💍 Weddings
🎉 Corporate Events  
🎊 Special Celebrations
🎪 Private Parties

We're based in Charleston, SC, and regularly travel throughout the Southeast.

Book now for upcoming 2026 dates!
${this.buildUTMLink(platform, 'post', `package_${this.slugify(pkg.name || 'special')}`)}`,
          
          link: this.buildUTMLink(platform, 'post', `package_${this.slugify(pkg.name || 'special')}`)
        },
        
        twitter: {
          tweet: `✨ ${pkg.name || 'Live Opera Package'} ✨

${pkg.description || 'Transform your event with live opera'}

Book today: ${this.buildUTMLink(platform, 'tweet', `package_${this.slugify(pkg.name || 'special')}`)}

#LiveOpera #WeddingMusic #Events`,
          
          link: this.buildUTMLink(platform, 'tweet', `package_${this.slugify(pkg.name || 'special')}`)
        }
      };
      
      return templates[platform] || templates.instagram;
    },

    /**
     * Generate artist spotlight post
     */
    generateArtistPost: function(settings) {
      const artist = settings.data;
      const platform = settings.platform;
      
      const templates = {
        instagram: {
          caption: `🎭 Meet ${artist.name || 'Our Artist'} 🎭

${artist.bio || 'A world-class opera performer bringing magic to your special day'}

🎵 Specialty: ${artist.voiceType || 'Opera & Classical'}
🏆 Highlights: ${artist.highlights || 'International performances'}
📍 Based in Charleston, SC

Swipe to hear ${artist.name || 'them'} perform! 👉

Book ${artist.name || 'our artists'} for your event via link in bio!

#AriaAmore #OperaSinger #LivePerformance #ClassicalSinger #WeddingMusician #ProfessionalSinger #Soprano #Tenor #CharlestonSC #LiveOpera`,
          
          story: `🎵 ${artist.name || 'Our Artist'}

Listen to this incredible voice! 🔊

Tap to hear more 👆`,
          
          link: this.buildUTMLink(platform, 'story', `artist_${this.slugify(artist.name || 'spotlight')}`)
        },
        
        tiktok: {
          caption: `POV: This is the voice you hear at your wedding 💍✨

Meet ${artist.name || 'our artist'} - ${artist.voiceType || 'opera singer'} 🎭

#operasinger #weddingmusic #livesinging #vocalist #classicalmusic #wedding #weddingvibes #liveperformance #southcarolina #fyp #viral`,
          
          link: this.buildUTMLink(platform, 'video', `artist_${this.slugify(artist.name || 'spotlight')}`)
        },
        
        facebook: {
          post: `🌟 Artist Spotlight: ${artist.name || 'Our Featured Performer'} 🌟

${artist.bio || 'An exceptional talent bringing elegance and emotion to every performance'}

${artist.highlights || '• International experience\n• Professional training\n• 100+ events'}

Hear ${artist.name || 'this artist'} perform live at your:
💍 Wedding ceremony
🎊 Reception
🎉 Special event

Available for booking now!
${this.buildUTMLink(platform, 'post', `artist_${this.slugify(artist.name || 'spotlight')}`)}`,
          
          link: this.buildUTMLink(platform, 'post', `artist_${this.slugify(artist.name || 'spotlight')}`)
        }
      };
      
      return templates[platform] || templates.instagram;
    },

    /**
     * Generate testimonial/review post
     */
    generateTestimonialPost: function(settings) {
      const testimonial = settings.data;
      const platform = settings.platform;
      
      const templates = {
        instagram: {
          caption: `💕 Client Love 💕

"${testimonial.quote || 'Aria Amore made our wedding unforgettable!'}"

- ${testimonial.client || 'Happy Client'}
${testimonial.event || 'Wedding, Charleston SC'}

This is why we do what we do! ✨

Book your unforgettable moment - link in bio!

#AriaAmore #ClientTestimonial #WeddingReview #HappyCouple #WeddingDay #LiveOpera #WeddingMusic #5Star #CharlestonWedding`,
          
          story: `⭐⭐⭐⭐⭐

"${testimonial.quote || 'Amazing performance!'}"

- ${testimonial.client || 'Happy Client'}

Your turn next? 💕
Swipe up!`,
          
          link: this.buildUTMLink(platform, 'story', 'testimonial')
        },
        
        facebook: {
          post: `⭐⭐⭐⭐⭐ 5-Star Review ⭐⭐⭐⭐⭐

"${testimonial.quote || 'Aria Amore exceeded all our expectations. The performance was breathtaking!'}"

— ${testimonial.client || 'Happy Client'}, ${testimonial.event || 'Wedding Client'}

Reviews like this warm our hearts! Thank you for letting us be part of your special day! 💕

Ready to create your own magical moment?
${this.buildUTMLink(platform, 'post', 'testimonial')}`,
          
          link: this.buildUTMLink(platform, 'post', 'testimonial')
        }
      };
      
      return templates[platform] || templates.instagram;
    },

    /**
     * Generate event announcement post
     */
    generateEventPost: function(settings) {
      const event = settings.data;
      const platform = settings.platform;
      
      const templates = {
        instagram: {
          caption: `🎭 Upcoming Performance 🎭

${event.name || 'Special Event'}
📅 ${event.date || 'Coming Soon'}
📍 ${event.location || 'Charleston, SC'}
🎵 ${event.description || 'An evening of classical opera'}

${event.ticketInfo || 'Limited seating available!'}

${event.ticketLink ? 'Link in bio for tickets!' : 'DM for more info!'}

#AriaAmore #LiveOpera #OperaPerformance #ClassicalMusic #Charleston #LiveEvent #MusicEvent`,
          
          link: this.buildUTMLink(platform, 'story', `event_${this.slugify(event.name || 'performance')}`)
        },
        
        facebook: {
          post: `🎪 UPCOMING EVENT 🎪

${event.name || 'Live Opera Performance'}

When: ${event.date || 'TBA'}
Where: ${event.location || 'Charleston, SC'}

${event.description || 'Join us for an unforgettable evening of live opera'}

${event.program || ''}

${event.ticketInfo || 'Tickets available now!'}

Book your seats:
${this.buildUTMLink(platform, 'event', `event_${this.slugify(event.name || 'performance')}`)}

We can also perform at YOUR event! Contact us for booking.`,
          
          link: this.buildUTMLink(platform, 'event', `event_${this.slugify(event.name || 'performance')}`)
        }
      };
      
      return templates[platform] || templates.instagram;
    },

    /**
     * Generate general promotional post
     */
    generateGeneralPost: function(settings) {
      const content = settings.data;
      const platform = settings.platform;
      
      const templates = {
        instagram: {
          caption: `✨ ${content.headline || 'Live Opera for Your Special Day'} ✨

${content.message || 'Experience the magic of live opera at your wedding or event'}

💍 Weddings
🎉 Corporate Events
🎊 Private Celebrations
🎪 Special Occasions

Based in Charleston, SC
Serving the Southeast

📧 Link in bio to book!

#AriaAmore #LiveOpera #WeddingMusic #EventEntertainment #CharlestonSC #OperaSinger #ClassicalMusic #WeddingPlanning`,
          
          link: this.buildUTMLink(platform, 'post', 'general')
        },
        
        tiktok: {
          caption: `${content.headline || 'Making your dreams come true'} 💕✨

${content.hook || 'Wait for it...'} 

#opera #wedding #livemusic #weddingsinger #classicalmusic #charleston #southcarolina #fyp #viral`,
          
          link: this.buildUTMLink(platform, 'video', 'general')
        }
      };
      
      return templates[platform] || templates.instagram;
    },

    /**
     * Build UTM tracking link
     */
    buildUTMLink: function(source, medium, campaign) {
      const baseUrl = 'https://ariaamore.com';
      const params = new URLSearchParams({
        utm_source: source,
        utm_medium: medium,
        utm_campaign: campaign
      });
      return `${baseUrl}?${params.toString()}`;
    },

    /**
     * Format features list
     */
    formatFeatures: function(features) {
      if (!features || features.length === 0) return '';
      return features.map(f => `✓ ${f}`).join('\n');
    },

    /**
     * Create URL-friendly slug
     */
    slugify: function(text) {
      if (!text) return 'promo';
      return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '_')
        .replace(/-+/g, '_');
    },

    /**
     * Get optimal posting times
     */
    getPostingSchedule: function(platform) {
      const schedules = {
        instagram: {
          best_days: ['Monday', 'Wednesday', 'Friday'],
          best_times: ['11:00 AM', '2:00 PM', '7:00 PM'],
          timezone: 'EST'
        },
        tiktok: {
          best_days: ['Tuesday', 'Thursday', 'Friday'],
          best_times: ['6:00 AM', '10:00 AM', '7:00 PM', '9:00 PM'],
          timezone: 'EST'
        },
        facebook: {
          best_days: ['Wednesday', 'Thursday', 'Friday'],
          best_times: ['1:00 PM', '3:00 PM'],
          timezone: 'EST'
        },
        twitter: {
          best_days: ['Monday', 'Tuesday', 'Wednesday'],
          best_times: ['9:00 AM', '12:00 PM', '5:00 PM'],
          timezone: 'EST'
        }
      };
      
      return schedules[platform] || schedules.instagram;
    },

    /**
     * Get platform-specific hashtag recommendations
     */
    getHashtags: function(platform, category) {
      const hashtags = {
        instagram: {
          wedding: '#AriaAmore #LiveOpera #WeddingMusic #WeddingSinger #ClassicalMusic #OperaSinger #WeddingEntertainment #LuxuryWedding #WeddingPlanning #CharlestonWeddings #SCWeddings #LiveMusic #WeddingMusician #Soprano #Tenor #WeddingCeremony',
          event: '#LiveOpera #OperaPerformance #ClassicalMusic #LiveEvent #Charleston #EventEntertainment #CorporateEvent #LivePerformance #EventPlanning',
          artist: '#OperaSinger #ClassicalSinger #Soprano #Tenor #ProfessionalSinger #VocalPerformance #ClassicalMusic #Opera #LivePerformance'
        },
        tiktok: {
          wedding: '#wedding #weddingmusic #liveopera #operasinger #classicalmusic #weddingsinger #weddingvibes #luxurywedding #fyp #viral',
          event: '#livemusic #opera #classicalmusic #performance #talent #singing #fyp #viral',
          artist: '#operasinger #vocalist #classicalmusic #talent #singing #voice #fyp #viral'
        }
      };
      
      return hashtags[platform]?.[category] || hashtags.instagram.wedding;
    },

    /**
     * Generate content calendar
     */
    generateContentCalendar: function(month, year) {
      const calendar = {
        month: month,
        year: year,
        themes: this.getMonthlyThemes(month),
        posts: []
      };
      
      // Generate weekly post suggestions
      const weeks = 4;
      for (let week = 1; week <= weeks; week++) {
        calendar.posts.push({
          week: week,
          monday: { type: 'artist', platform: 'instagram' },
          wednesday: { type: 'package', platform: 'facebook' },
          friday: { type: 'testimonial', platform: 'instagram' },
          saturday: { type: 'general', platform: 'tiktok' }
        });
      }
      
      return calendar;
    },

    /**
     * Get monthly content themes
     */
    getMonthlyThemes: function(month) {
      const themes = {
        1: { primary: 'New Year Bookings', secondary: 'Winter Weddings' },
        2: { primary: 'Valentine\'s Day', secondary: 'Spring Wedding Planning' },
        3: { primary: 'Spring Events', secondary: 'Easter Celebrations' },
        4: { primary: 'Spring Weddings', secondary: 'Outdoor Events' },
        5: { primary: 'Wedding Season Peak', secondary: 'Mother\'s Day' },
        6: { primary: 'June Weddings', secondary: 'Summer Events' },
        7: { primary: 'Summer Celebrations', secondary: 'July 4th' },
        8: { primary: 'Late Summer Weddings', secondary: 'Back to School Events' },
        9: { primary: 'Fall Weddings Begin', secondary: 'Corporate Events' },
        10: { primary: 'Fall Wedding Season', secondary: 'Halloween Events' },
        11: { primary: 'Thanksgiving', secondary: 'Holiday Party Bookings' },
        12: { primary: 'Holiday Events', secondary: 'New Year\'s Eve' }
      };
      
      return themes[month] || themes[1];
    }
  };

  // Make available globally
  window.SocialContentGenerator = SocialContentGenerator;

  // Export for Node.js if available
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialContentGenerator;
  }
})();
