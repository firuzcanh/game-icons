// Keyword-based categorizer for the game icon names.
// Names are split into words ("GiBurningSkull" -> ["burning", "skull"]).
// "Strong" keywords win anywhere in the name; otherwise the words are scanned
// right-to-left (English compounds put the head noun last: "FireShield" -> shield).

export const CATEGORIES = [
  { id: "weapons", label: "Weapons", icon: "GiCrossedSwords" },
  { id: "armor", label: "Armor & Shields", icon: "GiCheckedShield" },
  { id: "magic", label: "Magic & Alchemy", icon: "GiMagicSwirl" },
  { id: "monsters", label: "Monsters & Undead", icon: "GiDragonHead" },
  { id: "animals", label: "Animals & Insects", icon: "GiWolfHead" },
  { id: "people", label: "Characters & People", icon: "GiWizardFace" },
  { id: "body", label: "Body & Anatomy", icon: "GiHand" },
  { id: "combat", label: "Combat & Actions", icon: "GiPunchBlast" },
  { id: "health", label: "Health & Medical", icon: "GiHeartPlus" },
  { id: "elements", label: "Elements & Weather", icon: "GiFlame" },
  { id: "nature", label: "Plants & Nature", icon: "GiOakLeaf" },
  { id: "food", label: "Food & Drink", icon: "GiMeat" },
  { id: "places", label: "Buildings & Places", icon: "GiCastle" },
  { id: "vehicles", label: "Vehicles & Transport", icon: "GiRocket" },
  { id: "space", label: "Space & Sci-Fi", icon: "GiRingedPlanet" },
  { id: "tech", label: "Tech & Science", icon: "GiGears" },
  { id: "tools", label: "Tools & Equipment", icon: "GiClawHammer" },
  { id: "treasure", label: "Treasure & Jewelry", icon: "GiCutDiamond" },
  { id: "clothing", label: "Clothing & Wearables", icon: "GiPirateHat" },
  { id: "objects", label: "Everyday Objects", icon: "GiOpenBook" },
  { id: "games", label: "Cards, Dice & Games", icon: "GiPerspectiveDiceSixFacesRandom" },
  { id: "sports", label: "Sports & Leisure", icon: "GiSoccerBall" },
  { id: "arts", label: "Music & Arts", icon: "GiGuitar" },
  { id: "mind", label: "Mind & Emotions", icon: "GiBrain" },
  { id: "world", label: "Countries & Maps", icon: "GiWorld" },
  { id: "symbols", label: "Symbols & Shapes", icon: "GiTriquetra" },
  { id: "arrows", label: "Arrows & Interface", icon: "GiReturnArrow" },
  { id: "other", label: "Miscellaneous", icon: "GiCardRandom" },
];

// Matched anywhere in the name, checked before the head-noun scan.
const STRONG = {
  games: "card cards dice die chess meeple meeples domino jigsaw tarot poker gamepad joystick pawn rook bishop",
  symbols: "abstract logic",
  sports: "soccer basketball football baseball tennis golf bowling hockey cricket rugby volleyball",
};

const KEYWORDS = {
  weapons: `sword swords blade blades dagger daggers knife knives axe axes mace maces spear spears bow bows crossbow
    gun guns pistol pistols rifle shotgun revolver musket cannon cannons grenade bomb bombs missile missiles
    katana saber sabers sabre scimitar rapier halberd trident flail whip shuriken kunai boomerang sling bolas
    harpoon scythe sickle nunchaku sai bayonet dynamite turret ammo bullet bullets cartridge crosshair lance
    pike glaive morningstar warhammer quiver arrow arrows broadhead claymore cutlass falchion machete estoc
    gladius kris khopesh tomahawk javelin blowgun blunderbuss flamethrower minigun mp5 thompson uzi bazooka
    catapult trebuchet ballista mortar torpedo nuke weapon weapons sniper ak47 m16 luger colt winchester
    derringer gatling crossbows longbow shortbow hatchet cleaver club cudgel morgenstern caltrops kusarigama
    naginata yari tanto wakizashi zweihander flintlock mine mines landmine bolter`,
  armor: `shield shields armor armour helmet helmets helm helms gauntlet gauntlets breastplate chainmail barbute
    visor kevlar cuirass greaves bracers pauldron pauldrons sallet bascinet armet hauberk brigandine buckler
    pavise lamellar plastron`,
  magic: `magic magical spell spells wand wands rune runes runestone aura auras portal pentagram pentacle potion
    potions flask flasks cauldron elixir alchemy enchant enchanted curse cursed hex mana sorcery sigil glyph
    divination ritual orb orbs crystalball spellbook grimoire incantation teleport teleportation summon
    summoning conjure invisible invisibility levitation fairy dust sparkles sparkling arcane mystic mystical
    occult sacrifice soul souls witchcraft wizardry vortex`,
  monsters: `monster monsters dragon dragons demon demons daemon ghost ghosts zombie zombies vampire werewolf
    skeleton skeletons golem golems alien aliens troll trolls orc orcs goblin goblins imp imps hydra griffin
    gryphon centaur sphinx minotaur kraken tentacle tentacles slime cyclops gargoyle unicorn pegasus phoenix
    mummy spectre specter wraith lich beholder basilisk chimera medusa gorgon mermaid yeti cthulhu reaper
    behemoth wyvern kaiju harpy banshee djinn genie ogre ogres giant undead skull skulls grave graves coffin
    tombstone tomb death dead creature creatures beast leviathan cerberus manticore hellhound ghoul ent
    werewolves kobold dryad nymph siren satyr faun gnome gnomes cockatrice salamander lizardman fishman
    evil devil devils horror shambling abomination worm`,
  animals: `cat cats dog dogs wolf wolves fox foxes bear bears bird birds eagle eagles owl owls fish fishes shark sharks
    whale whales dolphin octopus squid crab crabs lobster shrimp turtle tortoise snake snakes serpent lizard
    gecko frog frogs toad rabbit bunny hare horse horses pony unicorn deer stag moose elk boar pig pigs cow
    cows bull bulls ox sheep ram goat lion lions tiger tigers leopard panther cheetah elephant rhino hippo
    giraffe zebra camel monkey ape gorilla chimpanzee mouse mice rat rats squirrel hedgehog beaver otter
    raccoon bat bats spider spiders bug bugs beetle beetles butterfly butterflies moth ant ants bee bees wasp
    hornet mosquito fly flies scorpion mite tick worm worms caterpillar snail slug centipede ladybug dragonfly
    cricket grasshopper locust chicken hen rooster duck ducks goose swan dove pigeon crow raven parrot penguin
    flamingo stork crane heron pelican seagull vulture hawk falcon peacock ostrich kiwi hummingbird
    woodpecker dinosaur dinosaurs velociraptor sauropod trex rex triceratops stegosaurus pterodactyl
    raptor mammoth sabertooth croc crocodile alligator jellyfish starfish seahorse oyster clam mussel
    snail shell shells paw paws claw claws feather feathers tusk tusks fang fangs horn horns antler antlers
    hoof fur maggot leech koala kangaroo panda sloth platypus armadillo anteater badger wolverine weasel
    ferret skunk opossum mole llama alpaca bison buffalo yak hyena jackal lynx cougar puma jaguar walrus
    seal orca narwhal manatee eel piranha anglerfish swordfish salmon trout tuna carp koi goldfish
    clownfish scarab cockroach termite flea louse tapir capybara sheep lamb hound puppy kitten donkey mule
    reptile reptiles insect insects animal animals creature`,
  people: `person people man men woman women female male king kings queen queens knight knights pirate pirates
    ninja ninjas viking vikings wizard wizards witch witches warlock priest priests monk monks samurai soldier
    soldiers cowboy nurse doctor police policeman spy thief robber captain family team player players crowd
    character elf elves dwarf dwarves hobbit hobbits barbarian archer warrior warriors mage sorcerer
    sorceress necromancer paladin cleric druid ranger rogue assassin bandit hunter farmer miner pilot
    astronaut diver scuba cook chef bartender merchant peasant prince princess emperor pharaoh god goddess
    angel angels jester clown cultist templar spartan gladiator legionnaire musketeer guard guards sheriff
    detective scientist student teacher baby child children kid boy girl old elder hermit beggar
    executioner hangman mummy cyborg android hacker gamer punk geisha geishas nun pope bishop cardinal
    crusader conquistador indian native caveman shaman oracle prophet saint thor odin zeus anubis horus
    ra osiris isis poseidon hades medusa apollo athena hermes loki freyja william tell robin hood
    sherlock santa fireman firefighter surgeon dentist pharmacist vigilante hero heroes villain
    commander general sergeant officer marine sailor admiral explorer adventurer traveler hiker
    mountaineer climber skier surfer swimmer runner walker dancer singer drummer guitarist pianist
    painter sculptor writer poet chess-player meditation praying businessman lumberjack blacksmith
    tailor cobbler baker butcher fisherman hunter shepherd`,
  body: `head heads face faces eye eyes hand hands fist fists arm arms leg legs foot feet brain brains tooth
    teeth mouth lips lip nose ear ears tongue bone bones muscle muscles organ organs lung lungs kidney
    kidneys stomach liver spine ribcage rib ribs finger fingers thumb thumbs palm knee knees shoulder
    shoulders torso body bodies profile beard hair mustache moustache eyebrow eyelashes pupil iris
    skin chin cheek neck elbow wrist ankle heel toe toes nail nails hip hips belly navel pelvis skull
    jaw jaws limb limbs throat chest breast back butt abdominal abs blood veins vein
    intestines guts gut uterus womb embryo fetus dna smile frown grin wink tear tears sweat footprint
    footprints handprint fingerprint silhouette`,
  combat: `explosion explosions explosive blast blasts impact impacts punch punches kick kicks slash slashes
    strike strikes striking stomp wound wounds bleeding bloody crush crushed bite bites spit smash
    shockwave clash fight fighting fighter battle duel attack defense block parry dodge charge
    charging rage berserk grapple grab grasp tackle throw thrown thrust stab stabbed pierced impaled
    beheaded decapitation torture execution war conquest siege ambush sneak stealth backstab
    headshot shot shoot hit knockout ko boom bang kaboom burst split cut slice sliced chop crack cracked
    shattered broken break smashed destruction chaos domination sacrifice tied captured surrender
    stun stunned dizzy confusion fear terror scream screaming shout howl roar`,
  health: `health heart hearts healing heal heals medical medicine bandage bandages pill pills syringe hospital stethoscope
    virus viruses bacteria germ germs infection disease sick sickness plague poison poisoned toxic
    vaccine injection pulse heartbeat life lives revive resurrection first aid ambulance crutch crutches
    wheelchair disabled cast plaster medic nurse remedy cure antidote vitamin capsule tablet scalpel
    surgery stitch stitches drowning bleeding wound sneeze cough fever thermometer`,
  elements: `fire fires flame flames flaming burning burn burnt blaze inferno ember embers water waters ice
    icy frozen freeze lightning bolt bolts thunder thunderbolt sun suns sunny sunrise sunset moon cloud
    clouds cloudy rain raining rainbow snow snowflake snowing wind windy tornado storm stormy hurricane
    wave waves tide earth earthquake rock rocks stone stones lava magma volcano weather fog mist smoke
    smoking steam vapor heat hot cold frost frosted icicle icicles drop drops droplet splash spray
    bubble bubbles flood tsunami whirlwind cyclone hail lightningbolt sandstorm dust spark sparks
    sparkle electric electricity static energy plasma acid gas radiation radiations dark
    darkness shadow shadows eclipse day night dawn dusk element elements`,
  nature: `tree trees leaf leaves flower flowers rose roses mushroom mushrooms plant plants vine vines grass cactus
    oak pine palm bamboo sprout seed seeds root roots lotus lily lilies clover bud blossom petal petals
    tulip daisy sunflower orchid poppy ivy fern moss herb herbs weed weeds wheat thorn thorns thorny bush
    shrub hedge forest woods jungle garden branch branches log logs stump trunk twig acorn pinecone
    cone flora bonsai sapling willow birch maple cedar cypress spruce baobab sequoia coral seaweed kelp
    algae mountain mountains hill hills valley cliff cliffs canyon desert beach island islands ocean sea
    lake river waterfall swamp marsh field fields meadow cave caves crater landscape horizon sand
    pebble boulder fossil fossils crystal crystals mineral minerals geode`,
  food: `food foods apple apples banana bananas bread meat cheese cake cakes pizza egg eggs coffee tea beer wine
    bottle drink drinks fruit fruits vegetable vegetables carrot carrots potato potatoes tomato tomatoes
    onion garlic pepper peppers corn rice noodles pasta spaghetti soup stew sausage sausages bacon ham steak
    chicken drumstick burger hamburger hotdog sandwich taco burrito sushi dumpling dumplings kebab pie pies
    cookie cookies candy chocolate lollipop donut doughnut croissant pretzel waffle pancake pancakes
    honey jam butter milk cream icecream sugar salt spice spices sauce ketchup mustard mayonnaise oil
    grapes grape cherry cherries strawberry strawberries lemon lemons lime orange oranges peach pear plum
    pineapple watermelon melon coconut avocado mango kiwi berry berries blueberry raspberry olive olives
    nut nuts peanut almond chestnut walnut bean beans pea peas lettuce cabbage broccoli cucumber
    eggplant pumpkin pumpkins squash zucchini radish beet turnip mushroom popcorn chips fries
    meal meals dinner breakfast lunch feast cooking cook cooked kitchen chef recipe pot pots pan
    frying bowl bowls plate plates spoon fork chopsticks cup cups mug mugs teapot kettle jug jar jars
    can cans tin cocktail martini whiskey vodka sake soda juice lemonade water-bottle bottled
    fried roast roasted grill grilled barbecue bbq ribs fish-food caviar shrimp oyster jelly gelatin
    wrap tortilla toast cereal oatmeal porridge yogurt pudding custard tart muffin cupcake brownie
    macaron sweets dessert snack snacks grain grains flour dough loaf baguette knead`,
  places: `house houses castle castles tower towers temple temples church churches gate gates door doors bridge
    bridges wall walls fort fortress village villages city cities town shrine shrines pyramid pyramids
    dungeon dungeons barracks factory factories hospital school bank bunker bunkers tent tents camp
    camping road roads path paths stairs staircase ladder window windows fountain fountains ruins pillar
    pillars column columns arch arches dome domes windmill lighthouse well prison jail cage cages saloon
    shop store market garage igloo hut cabin barn farm mill palace mansion manor cathedral mosque
    pagoda torii colosseum arena stadium theater theatre museum library tavern inn hotel office
    skyscraper building buildings home homes kennel stable greenhouse observatory station port
    harbor dock pier lab laboratory warehouse shed fence fences gateway entrance exit doorway hall
    throne room rooms floor ceiling corridor maze labyrinth catacomb crypt mausoleum graveyard
    cemetery monument statue obelisk totem menhir dolmen stonehenge ziggyrat ziggurat mastaba tipi
    teepee yurt treehouse watchtower keep battlements drawbridge moat portcullis trench trenches
    platform podium stage altar parliament capitol whitehouse embassy courthouse`,
  vehicles: `car cars truck trucks bus buses ship ships boat boats sailboat submarine airplane airplanes plane
    planes helicopter train trains bicycle bike motorcycle motorbike tank tanks jet jets wagon wagons
    cart carts van scooter skateboard tractor drakkar canoe kayak glider balloon zeppelin airship blimp
    tire tires wheel wheels vehicle vehicles taxi limo limousine ambulance firetruck police-car
    jeep convertible pickup minivan caravan trailer sled sledge snowmobile raft galleon frigate
    caravel junk gondola yacht ferry steamboat battleship carrier destroyer cruiser hovercraft
    tram subway metro railway locomotive monorail cablecar segway unicycle tricycle rickshaw
    chariot carriage stagecoach mech exosuit spaceship spacecraft shuttle ufo racing race kart
    steering engine anchor anchors propeller sail sails mast oar oars paddle cockpit parachute
    fighter bomber airliner biplane quadcopter drone drones forklift crane bulldozer excavator
    roller harvester`,
  space: `planet planets galaxy moon moons rocket rockets satellite satellites ufo space
    astronaut orbit orbital orbits comet comets meteor meteors asteroid asteroids blackhole nebula
    cosmos cosmic universe solar lunar mars venus jupiter saturn mercury neptune uranus pluto earth
    telescope laser lasers robot robots mech mecha cyborg android droid hologram teleporter
    raygun blaster spaceship starship alien sci-fi scifi futuristic plasma constellation`,
  tech: `computer computers cpu processor chip microchip circuit phone phones smartphone mobile tv television
    radio battery batteries plug socket electric electrical network wifi wireless camera cameras
    video film keyboard monitor screen laptop tablet server disk floppy usb console radar antenna
    signal broadcast microscope molecule molecules atom atoms dna chemical chemistry test tube tubes
    magnet magnetic nuclear radioactive reactor generator turbine gear gears cog cogs machine
    machines engine motor pump valve pipe pipes wire wires cable cables circuitry transistor
    resistor capacitor diode led bulb lightbulb lamp tesla coil oscilloscope sonar barcode qr code
    hacker binary data database cloud internet web globe headphones speaker speakers microphone
    printer printing projector calculator clock watch watches stopwatch timer gps satellite
    science scientist laboratory experiment beaker flask petri pipette centrifuge lens lenses
    prism mirror fiber optical solar panel panels power powered energy charge charging fuse
    switch button buttons remote controller vr hologram rotor`,
  tools: `hammer hammers saw saws wrench wrenches spanner screwdriver pickaxe pick shovel spade drill drills
    pliers screw screws rope ropes chain chains hook hooks key keys lock locks padlock bucket buckets
    broom brush needle needles sewing scissors shears anvil toolbox crowbar trowel rake hoe watering
    magnifying compass map maps lantern lanterns torch torches candle candles flashlight umbrella
    tool tools extinguisher cutter chisel file mallet sledgehammer jackhammer level ruler tape measure
    measuring caliper vise clamp bolt nut nuts washer pulley lever winch jack crank funnel sieve
    strainer net nets trap traps cage leash collar harness saddle horseshoe whip fishing rod
    hook bait lure spyglass binoculars backpack rucksack canteen tent sleeping bag flint matches
    match lighter cord string thread spool knot knots stake stakes nail nailed plunger sponge
    mop vacuum ladder scaffold wheelbarrow pitchfork scythe sickle shears plow plough sprinkler
    hose pump tweezers syringe thermometer barometer hourglass sundial scales scale balance
    weight weights stapler stamp seal sealed scroll quill pen pencil pencils eraser marker
    crayon paintbrush chalk razor comb mirror tongs ladle whisk grater peeler opener corkscrew`,
  treasure: `coin coins money gold golden silver gem gems diamond diamonds jewel jewels jewelry crystal ruby
    emerald sapphire topaz amethyst opal pearl pearls chest chests treasure treasures crown crowns ring
    rings necklace necklaces pendant pendants amulet amulets trophy trophies medal medals chalice goblet
    tiara diadem scepter sceptre earring earrings bracelet bracelets brooch locket cameo ingot ingots
    nugget nuggets wealth riches loot jackpot piggy bank dollar euro pound yen bitcoin cash wallet
    purse pouch reward prize laurel laurels laurel crown regalia orb-scepter`,
  clothing: `hat hats cap caps shirt shirts dress dresses boot boots shoe shoes glove gloves cloak cloaks cape
    capes robe robes belt belts tie ties jacket jackets coat coats pants trousers jeans skirt skirts sock
    socks underwear scarf scarves hood hoods hooded vest vests bra sandal sandals slipper slippers apron
    kimono uniform tunic toga gown tuxedo suit suits overalls shorts tshirt t-shirt sweater hoodie
    pajamas bikini swimsuit lingerie corset bow-tie necktie bowtie glasses sunglasses goggles monocle
    mask masks helmet-cap beanie beret bonnet fedora sombrero stetson turban bandana headband tiara
    wig crown-hat top-hat tophat mitten mittens sneakers heels high-heel moccasin clogs leggings
    stockings garter suspenders cufflinks lanyard badge backpack handbag pocket pockets sleeve sleeveless
    collar fabric cloth clothes clothing outfit costume poncho shawl veil diaper`,
  objects: `book books paper papers letter letters mail envelope scroll scrolls chair chairs table tables bed
    beds sofa couch bench desk shelf bookshelf cabinet drawer wardrobe closet box boxes crate crates
    barrel barrels bag bags sack sacks basket baskets bottle bottles jar vase vases pot urn amphora
    clock clocks hourglass calendar candle candlestick candelabra lamp chandelier mirror frame
    light lights picture photo painting carpet rug curtain pillow cushion blanket towel soap toothbrush toothpaste
    toilet bathtub shower sink faucet tap tub bowl plate cup mug glass tray cutlery teacup
    gift present package parcel envelope postcard newspaper magazine notebook journal diary folder
    file document documents ticket tickets receipt card-box suitcase luggage briefcase umbrella
    cane walking stick sticks stick broom fan pipe smoking cigarette cigar ashtray matchbox lighter
    toy toys doll teddy kite yo-yo yoyo rattle pacifier cradle crib stroller balloon balloons
    confetti party ribbon ribbons bow-ribbon trash bin garbage recycle box sign signs signpost
    mailbox flag flags banner banners pennant plaque tag tags label price coupon bell bells
    whistle horn trumpet-horn megaphone telephone hanger nail-polish lipstick perfume cosmetics
    makeup powder compact hairbrush spray bucket can cans tin wrapped package bundle`,
  sports: `ball balls sport sports soccer football basketball tennis golf baseball bowling boxing hockey
    cricket rugby skate skates skating ski skiing snowboard surf surfing surfboard swimming swim diving
    dive running run jogging jump jumping hurdle hurdles race racing podium whistle racket racquet polo
    curling archery archer weightlifting lift lifting gym dumbbell kettlebell javelin discus shotput
    pole-vault wrestling karate judo kung fu taekwondo fencing sumo yoga pilates stretch stretching
    climbing climb rope-climbing parachute parachuting paragliding hang-gliding rowing kayaking canoeing
    sailing fishing hunting camping hiking cycling biking marathon olympic medal goal goalkeeper
    net referee sneakers trophy champion championship score scoreboard stopwatch dart darts billiard
    billiards pool snooker frisbee boomerang-sport skateboard rollerskate rollerblade roller
    trampoline gymnastics juggling juggle acrobat circus carousel ferris rollercoaster amusement
    playground swing slide seesaw sandbox kite badminton shuttlecock pingpong table-tennis
    lacrosse handball waterpolo dodgeball kickball paddle paddleball cheerleader bowling-pin pins
    dunk kicking dribble pass catch catcher pitch pitcher batter bat-sport glove-sport`,
  games: `game games card cards dice die chess meeple meeples domino dominoes jigsaw puzzle puzzles tarot poker
    gamepad joystick controller console arcade pawn rook bishop knight-chess ace aces spades clubs
    hearts-card diamonds-card joker jack-card queen-card king-card token tokens lottery bingo roulette
    slot casino gambling bet chip chips mahjong backgammon checkers go shogi tic-tac-toe sudoku
    rubik cube-puzzle level levels hud pixel retro 8-bit player-one checkpoint quest achievement
    xp leaderboard rpg mmo ludo`,
  arts: `music musical note notes clef guitar guitars drum drums piano violin cello harp flute trumpet
    saxophone trombone tuba clarinet oboe bagpipes accordion harmonica banjo ukulele lute lyre
    mandolin sitar xylophone marimba tambourine cymbal cymbals gong triangle-instrument maracas
    castanets bell-instrument microphone speaker headphones radio vinyl record cassette cd
    jukebox gramophone phonograph metronome theater theatre drama comedy tragedy mask-drama
    paint painting palette brush paintbrush canvas easel sculpture statue chisel-art pottery
    ceramic vase-art pencil quill ink inkwell calligraphy sketch drawing pen crayon art artist
    dance dancing ballet tutu film camera movie cinema clapperboard spotlight stage curtain
    concert orchestra conductor baton opera choir sing singing song tune melody rhythm beat
    disco party celebration fireworks firework confetti origami knitting weaving loom spinning
    sewing embroidery photography photo selfie poster comic comics manga anime story storytelling
    writing poem poetry scroll-art tapestry mosaic`,
  symbols: `symbol symbols emblem emblems sign flag flags banner banners star stars cross crosses circle
    circles triangle triangles square squares spiral spirals swirl swirls knot infinity yin yang
    triskelion triquetra hieroglyph hieroglyphs glyph ankh peace omega alpha letter number numbers
    abstract logic gate checkmark check warning hazard biohazard radioactive-symbol hexagon pentagon
    octagon diamond-shape rhombus polygon shape shapes pattern patterns fractal mandala zigzag
    wave-symbol helix moebius mobius trefoil celtic tribal totem-symbol sun-symbol crescent
    swastika-free heraldry crest coat-of-arms fleur lis rose-symbol cog-symbol trinity duality
    balance harmony chaos-symbol order sigil-symbol logo icon badge insignia rank chevron chevrons
    stripes stripe dot dots grid nested interleaved interlaced concentric radial ring-symbol
    target targets bullseye crosshair-symbol mark marks marker sticker stamp seal`,
  arrows: `up down left right return cycle cycling rotation rotate clockwise anticlockwise counterclockwise
    next previous forward backward back expand contract shrink grow resize zoom cursor pointer
    play pause stop record rewind fast-forward save load upgrade downgrade plus minus check cancel
    close open menu settings options refresh reload sync undo redo exit enter direction directions
    horizontal vertical diagonal corner switch toggle reverse flip mirror inverted u-turn
    curved bend branching merge split-arrow converge diverge`,
};


// Second pass of keywords, collected from names the first pass missed.
const EXTRA = {
  weapons: `ak47 ak47u autogun broadsword brassknuckles brass knuckles c96 chaingun chainsaw chakram czskorpion
    famas fnfal glock gunshot leeenfield lee enfield mac10 molotov mp40 mp5k p90 panzerfaust scabbard
    slingshot steyraug steyr aug stiletto switchblade tec9 waltherppk walther ppk squib detonator
    massdriver arrowhead bo flamer underhand strafe autogun lasso tripwire spikeball silenced`,
  armor: `bracer galea pickelhaube stahlhelm pteruges shieldcomb balaclava`,
  magic: `charm magick trick crystalize glowing artifact holosphere triorb transform transfuse haunting
    hidden stigmata incense aspergillum caduceus disintegrate telefrag spawn node`,
  monsters: `fomorian ifrit oni sasquatch direwolf metroid thwomp troglodyte octoman cyclop jawless megabot
    calavera carrion minion minions brute tentacurl eyestalk staryu klingon overmind hivemind infested`,
  animals: `ammonite axolotl cobra dimetrodon diplodocus earwig ermine feline finch flatfish helicoprion ibis
    pangolin parasaurolophus plesiosaurus porcupine porcupinefish pterodactylus rattlesnake scallop
    sparrow swallow tadpole toucan trilobite udder snout cigale pounce cobweb fishbone beak wing wings
    fluffy curly`,
  people: `bowman swordman swordwoman fencer pikeman juggler luchador eskimo prisoner convict corporal
    private caesar cleopatra nefertiti pharoah conqueror ringmaster contortionist medallist puppet
    scarecrow snowman troglodyte three friends newborn new born cavalry acrobatic`,
  body: `anatomy biceps bowels eyeball fingernail footsteps forearm frontal lobe incisors jawbone kneeling
    barefoot fat tumor heartburn bad breath vomiting amputation strong high five shrug pointing gaze
    look sleepy eyepatch eyedropper marrow`,
  combat: `arrest demolish dodging evasion avoidance overkill pummeled sideswipe slap snatch trample
    whiplash shatter implosion confrontation annexation occupy oppression revolt uprising rally troops
    interdiction encirclement push pull pounce triggerhurt trigger hurt arson pyromaniac telefrag
    groundbreaker heavy fall triple scratches misdirection distraction unstable projectile`,
  health: `antibody defibrilate overdose regeneration ultrasound miracle medecine internal injury coma
    pill-bottle vial transfuse incubator`,
  elements: `afterburn eruption fireball fireflake frostfire flake dew foam iceberg icebergs stalactites
    stalagtite sunbeams twister wildfires laserburn beam beams sinusoidal ripples echo leak spill spatter
    splurt gloop goo vile fluid blob ovoid quicksand caldera crags peaks summits mountaintop campfire
    brasero pyre h2o matter states splashy stream entangled typhoon melting`,
  nature: `agave beech beanstalk chanterelles flax hemp jasmine reed seedling shamrock tumbleweed wool yarn
    ecology growth oasis crags oat hops sesame cornucopia`,
  food: `asparagus aubergine blackcurrant boba bokchoy bok choy booze carambola charcuterie dango elderberry
    leek marshmallows nachos oden onigori pickle pimiento raddish tangerine wok saucepan toaster blender
    pressure cooker juicer champagne cork eating gluttony honeycomb honeypot cooler`,
  places: `aqueduct arc triomphe coliseum fallout shelter granary oppidum palisade portculis qaitbay citadel
    rempart tumulus akhet moai uluru fuji refinery round silo dam elevator escalator turnstile fireplace
    chimney furnace barricade barrier gibbet guillotine pavilion martyr memorial crossroad trail detour
    slumbering sanctuary lockers airtight hatch apothecary aquarium congress tribunal jury cryo chamber
    windpump stockpiles`,
  vehicles: `apc dreadnought galley trireme flatbed velocipede ropeway figurehead deathcab ironhulled hulled
    warship starfighter tyre tread swimfins snorkel periscope`,
  space: `sattelite spoutnik ursa major holosphere nanobot artificial intelligence starfighter`,
  tech: `abacus aerosol astrolabe atlas sextant backup boombox computing pc rss vhs walkie talkie earbuds
    speedometer movement sensor erlenmeyer fission soldering iron clockwork cogsplosion pokecog
    firewall digital trace click select share info help usable unplugged double diaphragm expander
    amplitude resonance histogram diagram chart organigram progression duration time synchronization
    pylon`,
  tools: `bellows carabiner clothesline clothespin gavel lockpicks unlocking keyring handcuffs handcuffed
    manacles mantrap pincers plier triple plier stamper highlighter safety pin pin dig hole digdug
    mining logging tinker crafting auto repair jerrycan cannister bindle knapsack lorgnette spectacles
    planks packed woodpile wood pile coal brick clay ibeam i-beam metal bar blindfold zipper`,
  treasure: `banknote credits currency rupee saphir torc profit expense trade coinflip strongbox holy grail
    glowing artifact`,
  clothing: `eyepatch fez loincloth ushanka cowled balaclava wingfoot`,
  objects: `bar stool bookmark bookmarklet checklist diploma papyrus passport portrait archive register
    research cube cubes stack disc candlebright marbles pinata windchimes windsock buoy mooring bollard
    round knob hive beehive spring bouncing wooden pegleg turd prayer beads`,
  games: `d4 d10 d12 d20 companion cubeforce chessboard pinball flipper leapfrog tightrope triforce dig-dug
    blackball spikes spiky pit thwomp wavy itinerary`,
  sports: `cartwheel discobolus finish line slalom sprint spearfishing extra time human cannonball medallist
    whistle`,
  arts: `bassoon bugle call carillon carnyx djembe double quaver ocarina viola vuvuzelas yunluo mona lisa
    anthem kindle read sound off on mute`,
  mind: `brainstorm despair delighted cheerful paranoia think idea inspiration telepathy enlightenment
    awareness wisdom surprised suspicious love lovers smitten cherish sensuousness temptation liar
    eternal mystery royal relationship bounds self inner uncertainty choice convince conversation
    discussion talk nothing say silence sly smart enrage dread morbid humour knowledge classical
    skills journey extra lucid confirmed injustice truce join vote all one tribunal`,
  world: `africa algeria angola antarctica australia belgium bolivia brazil bulgaria cambodia colombia corsica
    egypt france guatemala hungary iceland iraq italia japan kenya latvia libya mexico moldova mongolia
    nigeria paraguay peru poland portugal south america korea spain sri lanka switzerland tanzania texas
    tunisia uruguay venezuela world globe map maps europe asia country countries continent island`,
  symbols: `anarchy aquarius aries cancer capricorn gemini leo libra ophiuchus pisces sagittarius scorpio
    taurus virgo heptagram ouroboros trinacria rub el hizb dwennimmen freemasonry balkenkreuz
    crucifix azul cantua coa jima sinagot cuauhtli sverd fjell air force bricks lbrick jbrick obrick
    sbrick tbrick zbrick ibrick divergence twirl center spiked halo reticule doubled dozen nodular
    unbalanced`,
  arrows: `move walk transform halt expander overdrive overhead on-sight sound-on`,
};

// Generic words that leaked in from multi-word names; they must never decide a category.
const STOPWORDS = new Set(`three friends new born high five bad strong look heavy fall triple unstable rally trigger hurt internal
  miracle matter states splashy entangled round arc fallout qaitbay martyr slumbering airtight cryo ursa major
  artificial movement soldering digital double time safety dig hole auto packed wood pile metal bar holy glowing
  stool archive register research knob mooring prayer wooden bouncing companion wavy finish extra human bugle
  mona off on eternal royal self inner nothing say lucid all one join classical morbid south sri rub el coa
  sverd air force twirl center spiked doubled`.split(/\s+/));

const toSet = (s) => new Set(s.split(/\s+/).filter((w) => w && !STOPWORDS.has(w)));
const STRONG_SETS = Object.fromEntries(Object.entries(STRONG).map(([k, v]) => [k, toSet(v)]));
const KEYWORD_SETS = Object.fromEntries(
  Object.keys({ ...KEYWORDS, ...EXTRA }).map((k) => [k, toSet(`${KEYWORDS[k] ?? ""} ${EXTRA[k] ?? ""}`)]),
);

export function splitWords(name) {
  return name
    .replace(/^Gi/, "")
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .replace(/\b3 d\b/g, "3d")
    .split(/\s+/)
    .filter(Boolean);
}

const stem = (w) => {
  const out = [w];
  if (w.endsWith("ies")) out.push(w.slice(0, -3) + "y");
  if (w.endsWith("es")) out.push(w.slice(0, -2));
  if (w.endsWith("s")) out.push(w.slice(0, -1));
  if (w.endsWith("ing")) out.push(w.slice(0, -3));
  if (w.endsWith("ed")) out.push(w.slice(0, -2), w.slice(0, -1));
  return out;
};

function lookup(word, sets, order) {
  const forms = stem(word);
  for (const id of order) {
    if (forms.some((f) => sets[id].has(f))) return id;
  }
  return null;
}

// Order used when one word belongs to several categories.
const PRIORITY = [
  "games", "weapons", "armor", "monsters", "animals", "magic", "vehicles", "space", "treasure",
  "clothing", "food", "places", "people", "body", "health", "combat", "elements", "nature",
  "world", "mind", "sports", "arts", "tools", "tech", "objects", "symbols", "arrows",
];

// Hand-picked overrides for names the heuristic gets wrong.
const OVERRIDES = {
  GiArchiveRegister: "objects",
  GiArchiveResearch: "objects",
  GiBarStool: "objects",
  GiRoundKnob: "objects",
  GiRingingAlarm: "objects",
  GiCardboardBoxClosed: "objects",
  GiPaperBagOpen: "objects",
  GiSmokingPipe: "objects",
  GiStoneTablet: "objects",
  GiWaxTablet: "objects",
  GiBlackBar: "symbols",
  GiDoubled: "symbols",
  GiTwirlCenter: "symbols",
  GiJamesBondAperture: "symbols",
  GiPrivateFirstClass: "symbols",
  GiDigDug: "games",
  GiCootieCatcher: "games",
  GiTabletopPlayers: "games",
  GiDigHole: "tools",
  GiWoodPile: "tools",
  GiIBeam: "tools",
  GiHexagonalNut: "tools",
  GiPadlockOpen: "tools",
  GiExtraLucid: "mind",
  GiJoin: "mind",
  GiPrayer: "mind",
  GiExtraTime: "sports",
  GiBoxingRing: "sports",
  GiFishingSpoon: "sports",
  GiPoolTableCorner: "sports",
  GiFalling: "combat",
  GiHeavyFall: "combat",
  GiOnSight: "combat",
  GiRoundStruck: "combat",
  GiHighFive: "body",
  GiLookAt: "body",
  GiStrong: "body",
  GiHole: "nature",
  GiRoundStrawBale: "nature",
  GiMatterStates: "tech",
  GiArtificialIntelligence: "tech",
  GiMightyForce: "magic",
  GiDreamCatcher: "magic",
  GiMagicLamp: "magic",
  GiBoltSpellCast: "magic",
  GiIceSpellCast: "magic",
  GiFireSpellCast: "magic",
  GiSpikedTail: "animals",
  GiPrayingMantis: "animals",
  GiEarthWorm: "animals",
  GiUrsaMajor: "space",
  GiCakeSlice: "food",
  GiPieSlice: "food",
  GiBreadSlice: "food",
  GiGasStove: "food",
  GiMugShot: "people",
  GiOilRig: "places",
  GiBusStop: "places",
  GiVikingLonghouse: "places",
  GiTrophyCup: "treasure",
  GiExpandedRays: "elements",
  GiFlipFlops: "clothing",
  GiMusicalKeyboard: "arts",
  GiMusicalScore: "arts",
  GiTunePitch: "arts",
  GiCrystalBall: "magic",
  GiRuneStone: "magic",
  GiSpellBook: "magic",
  GiMantaRay: "animals",
  GiSchoolOfFish: "animals",
  GiVenusFlytrap: "nature",
  GiFlowerPot: "nature",
  GiVenusOfWillendorf: "arts",
  GiPianoKeys: "arts",
  GiGoldBar: "treasure",
  GiUnionJack: "world",
  GiShoulderScales: "armor",
  GiScaleMail: "armor",
  GiSpaceNeedle: "places",
  GiPunchingBag: "sports",
  GiPodiumWinner: "sports",
  GiChipsBag: "food",
  GiWineGlass: "food",
  GiCctvCamera: "tech",
  GiOilDrum: "objects",
  GiDoorHandle: "objects",
  GiPerfumeBottle: "objects",
  GiTrashCan: "objects",
  GiTelescopicBaton: "weapons",
  GiCarDoor: "vehicles",
  GiThreeFriends: "people",
  GiNewBorn: "people",
  GiAllForOne: "mind",
  GiNothingToSay: "mind",
  GiInnerSelf: "mind",
  GiAirForce: "symbols",
  GiMetalBar: "tools",
  GiMagnifyingGlass: "tools",
  GiBoltCutter: "tools",
  GiFireExtinguisher: "tools",
  GiTriggerHurt: "combat",
  GiSpinningTop: "games",
  GiHeartBeats: "health",
  GiAk47: "weapons",
  GiAk47U: "weapons",
  GiAutomaticSas: "weapons",
  GiCzSkorpion: "weapons",
  GiFnFal: "weapons",
  GiMac10: "weapons",
  GiMassDriver: "weapons",
  GiMinefield: "weapons",
  GiMp40: "weapons",
  GiMp5: "weapons",
  GiMp5K: "weapons",
  GiTec9: "weapons",
  GiCircularSawblade: "weapons",
  GiSilex: "weapons",
  GiThunderball: "weapons",
  GiBehold: "magic",
  GiEnergise: "magic",
  GiIcarus: "magic",
  GiFleshyMass: "monsters",
  GiSwallower: "monsters",
  GiBastet: "monsters",
  GiNanoBot: "tech",
  GiH2O: "tech",
  GiCoronation: "treasure",
  GiInauguration: "treasure",
  GiOre: "treasure",
  GiImprisoned: "combat",
  GiSuicide: "combat",
  GiSonicScreech: "combat",
  GiClout: "combat",
  GiDivert: "arrows",
  GiFragrance: "objects",
  GiJoint: "objects",
  GiSarcophagus: "objects",
  GiSlipknot: "objects",
  GiParmecia: "animals",
  GiMightyBoosh: "people",
  GiAges: "people",
};

export function categorize(name) {
  if (OVERRIDES[name]) return OVERRIDES[name];
  const words = splitWords(name);

  for (const w of words) {
    for (const [id, set] of Object.entries(STRONG_SETS)) {
      if (stem(w).some((f) => set.has(f))) return id;
    }
  }

  // "X of Y" / "X in Y": the head noun is before the preposition.
  const prep = words.findIndex((w) => ["of", "in", "on", "with", "for", "from", "under", "over"].includes(w));
  const scan = prep > 0 ? [...words.slice(0, prep).reverse(), ...words.slice(prep + 1).reverse()] : [...words].reverse();

  // Arrows: a plain "arrow" combined with a direction word is UI, not a weapon.
  const hasArrow = words.some((w) => w === "arrow" || w === "arrows");
  if (hasArrow && words.some((w) => KEYWORD_SETS.arrows.has(w))) return "arrows";

  let found = null;
  for (const w of scan) {
    found = lookup(w, KEYWORD_SETS, PRIORITY);
    if (found) break;
  }
  // "Dragon Head", "Wolf Head", "Pirate Face": a creature's body part belongs to the creature.
  if (found === "body") {
    for (const w of words) {
      const id = lookup(w, KEYWORD_SETS, ["monsters", "animals", "people"]);
      if (id) return id;
    }
  }
  return found ?? "other";
}
