// Preloader
        document.addEventListener('DOMContentLoaded', function() {
            const preloader = document.getElementById('preloader');
            const loadingBar = document.getElementById('loading-bar');
            
            // Simulate loading progress
            let width = 0;
            const interval = setInterval(function() {
                width += 5;
                loadingBar.style.width = width + '%';
                
                if (width >= 100) {
                    clearInterval(interval);
                    
                    // Hide preloader after a small delay
                    setTimeout(function() {
                        preloader.style.opacity = '0';
                        setTimeout(function() {
                            preloader.style.display = 'none';
                        }, 500);
                    }, 500);
                }
            }, 100);
        });
        
        // Font loading check
        document.fonts.ready.then(function() {
            console.log('All fonts are loaded and ready to use!');
        });
        
        // Typing animation
        const typingText = document.getElementById('typing-text');
        const phrases = [
            "Châu Anh Dũng",
            "Security Student",
            "Ehical Hacking",
            "Future Red Teamer"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isEnd = true;
                setTimeout(() => {
                    isDeleting = true;
                }, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            
            const typingSpeed = isDeleting ? 50 : isEnd ? 100 : 150;
            setTimeout(type, typingSpeed);
            
            if (isEnd) {
                isEnd = false;
            }
        }
        
        // Start typing animation
        setTimeout(type, 1000);
        
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Back to top button
        const backToTopButton = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Smooth scrolling for all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Matrix rain effect - Optimized for hacker aesthetic and performance
        const initMatrixEffect = () => {
            const canvas = document.getElementById('matrix');
            const ctx = canvas.getContext('2d', { alpha: false }); // Optimization for non-transparent canvas
            
            // Initialize variables
            const fontSize = 14;
            const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
            const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const nums = '0123456789';
            const binary = '01';
            const hackSymbols = '①②③④⑤⑥⑦⑧⑨⑩⓪⊕⊗⊙⌖⌘⌥⎔⨁⨂≠≥≤∞√∛∜∫∬∭∮∯∰∱∲∳⋄⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑';
            const specialChars = '!@#$%^&*()_+-=[]{}|;:,./<>?';
            const alphabet = katakana + latin + nums + binary + hackSymbols + specialChars;
            
            // Calculate columns
            let columns = Math.floor(window.innerWidth / fontSize);
            
            // Initialize arrays
            const drops = [];
            const chars = [];
            const speeds = [];
            const glows = [];
            
            // Set up the canvas with proper device pixel ratio for crisp text
            function setupCanvas() {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                
                // Scale canvas CSS size vs actual size for high DPI displays
                canvas.style.width = window.innerWidth + 'px';
                canvas.style.height = window.innerHeight + 'px';
                
                // Scale the context to match
                ctx.scale(dpr, dpr);
                
                // Setup text rendering
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = `${fontSize}px monospace`;
            }
            
            // Initialize the arrays
            function initializeMatrix() {
                for (let i = 0; i < columns; i++) {
                    drops[i] = Math.random() * -100; // Start above the canvas (staggered)
                    speeds[i] = Math.random() * 0.5 + 0.5; // Different speeds
                    chars[i] = [];
                    glows[i] = Math.random() > 0.9; // Some columns will have glowing characters
                    
                    // Fill each column with characters
                    for (let j = 0; j < 100; j++) {
                        chars[i][j] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                    }
                }
            }
            
            // Main drawing function
            function drawMatrix() {
                // Create trail effect with semi-transparent black overlay
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // For each column
                for (let i = 0; i < columns; i++) {
                    // Get the position in the column
                    const y = Math.floor(drops[i]);
                    
                    // Draw trailing characters with fading effect
                    for (let j = 0; j < 20; j++) { // Increased trail length for more dramatic effect
                        const currentY = y - j;
                        if (currentY < 0) continue; // Skip if off-screen
                        
                        // Calculate different alpha values for trailing effect
                        const alpha = 1 - (j / 20);
                        
                        // Mix up brightness for different characters in column
                        if (j === 0) {
                            // Leading character (white or bright green)
                            if (glows[i] || Math.random() > 0.95) {
                                ctx.fillStyle = '#ffffff'; // Occasional white character
                                
                                // Add extra glow effect for leading character
                                ctx.shadowBlur = 15;
                                ctx.shadowColor = '#00ff41';
                            } else {
                                ctx.fillStyle = '#00ff41'; // Bright green
                                ctx.shadowBlur = 5;
                                ctx.shadowColor = '#00ff41';
                            }
                        } else {
                            // Trailing characters with fading green
                            const green = Math.floor(255 * alpha * 0.8);
                            ctx.fillStyle = `rgba(0, ${green}, 0, ${alpha})`;
                            
                            // Less glow for trailing characters
                            ctx.shadowBlur = 0;
                        }
                        
                        // Draw the character
                        ctx.fillText(
                            chars[i][currentY % chars[i].length], 
                            i * fontSize + fontSize/2,  // Center in column
                            currentY * fontSize + fontSize/2   // Center vertically
                        );
                        
                        // Randomly change characters (more often for the leading character)
                        if ((j === 0 && Math.random() > 0.9) || Math.random() > 0.99) {
                            chars[i][currentY % chars[i].length] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                        }
                    }
                    
                    // Move drops down
                    drops[i] += speeds[i];
                    
                    // Reset drop when it reaches bottom of screen
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
                        drops[i] = 0;
                        speeds[i] = Math.random() * 0.5 + 0.5; // Randomize speed when resetting
                        glows[i] = Math.random() > 0.9; // Chance to get a glowing column
                    }
                }
                
                // Add occasional glitch effect
                if (Math.random() > 0.995) {
                    // Horizontal lines
                    const lineCount = Math.floor(Math.random() * 3) + 1;
                    
                    for (let i = 0; i < lineCount; i++) {
                        const y = Math.random() * canvas.height;
                        const height = Math.random() * 3 + 1;
                        
                        ctx.fillStyle = 'rgba(0, 255, 65, 0.8)';
                        ctx.fillRect(0, y, canvas.width, height);
                    }
                }
                
                // Use requestAnimationFrame for better performance
                requestAnimationFrame(drawMatrix);
            }
            
            // Handle window resize
            function handleResize() {
                setupCanvas();
                const newColumns = Math.floor(window.innerWidth / fontSize);
                
                // If we need more columns than we have
                if (newColumns > columns) {
                    // Keep current columns
                    const newDrops = [...drops];
                    const newChars = [...chars];
                    const newSpeeds = [...speeds];
                    const newGlows = [...glows];
                    
                    // Add columns
                    for (let i = columns; i < newColumns; i++) {
                        newDrops[i] = Math.random() * -100;
                        newSpeeds[i] = Math.random() * 0.5 + 0.5;
                        newGlows[i] = Math.random() > 0.9;
                        newChars[i] = [];
                        
                        for (let j = 0; j < 100; j++) {
                            newChars[i][j] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                        }
                    }
                    
                    // Update arrays
                    drops.length = 0;
                    chars.length = 0;
                    speeds.length = 0;
                    glows.length = 0;
                    
                    // Copy new values
                    newDrops.forEach(d => drops.push(d));
                    newChars.forEach(c => chars.push(c));
                    newSpeeds.forEach(s => speeds.push(s));
                    newGlows.forEach(g => glows.push(g));
                    
                    // Update columns count
                    columns = newColumns;
                } 
                // If we need less columns
                else if (newColumns < columns) {
                    // Trim arrays
                    drops.length = newColumns;
                    chars.length = newColumns;
                    speeds.length = newColumns;
                    glows.length = newColumns;
                    
                    // Update columns count
                    columns = newColumns;
                }
            }
            
            // Initialize everything
            setupCanvas();
            initializeMatrix();
            
            // Start the animation
            requestAnimationFrame(drawMatrix);
            
            // Handle resize properly
            window.addEventListener('resize', handleResize);
        };
        
        // Load matrix effect after the page loads
        window.addEventListener('load', initMatrixEffect);
    </script>