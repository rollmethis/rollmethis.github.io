// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

var spellElementArray = ["", "cantrips", "level1-spells", "level2-spells", "level3-spells",
    "level4-spells", "level5-spells", "level6-spells", "level7-spells", "level8-spells",
    "level9-spells", "levelCast", "spellCastButton", "spellOutput"];
var PCLevel = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th",
    "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th"];
var currentID = 0, currentLevel = 0;
var currentSpell;
var spellLevelText = ["", "Cantrip", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
var BardMissingSpellLevels = ["4th", "6th"];
var ClericMissingSpellLevels = ["9th"];
var RangerMissingSpellLevels = ["4th"];
var RogueMissingSpellLevels = ["2nd", "3rd"];

$(document).ready(function () {

    (function () {
        addStatLabel();
        fillPCLevels();
    })();

    function fillPCLevels() {
        var PCClass = $("#playerCharacter-class").val();
        var i = 1;
        if (PCClass == "Paladin" || PCClass == "Ranger") {
            i = 2;
        }
        else if (PCClass == "Monk" || PCClass == "Fighter" || PCClass == "Rogue") {
            i = 3;
        }
        $("#chacaterLevel-select").empty();
        for (; i <= 20; i++) {
            $("#chacaterLevel-select").append(new Option(PCLevel[i], i));
        }

    }

    $("#playerCharacter-class").change(function () {
        fillPCLevels();
    });

    $("#spellSelect").click(function () {
        $("#playerCharacter-Data").hide();
        $("#spellCaster").show();
        $("#cantrips").hide();
        for (var i = 1; i <= 9; i++) {
            $("#level" + i + "-spells").hide();
        }
        showCasterLevelSpells();
        $("#output").empty();
        $("#levelCast").hide();
        $("#spellCastButton").hide();
    });

    function addStatLabel() {
        var PCClass = document.getElementById("playerCharacter-class").value;

        $("#CastStatLabel").html("");

        if (PCClass == "Bard" || PCClass == "Paladin" || PCClass == "Sorcerer" || PCClass == "Warlock") {
            $("#CastStatLabel").html("Enter your <font color='red'>Charisma</font> score");
        }
        else if (PCClass == "Cleric" || PCClass == "Druid" || PCClass == "Monk" || PCClass == "Ranger") {
            $("#CastStatLabel").html("Enter your <font color='green'>Wisdom</font> score");
        }
        else if (PCClass == "Fighter" || PCClass == "Rogue" || PCClass == "Wizard") {
            $("#CastStatLabel").html("Enter your <font color='blue'>Intelligence</font> score");
        }
    };

    function showCasterLevelSpells() {
        var PCLevel = CurrentPlayerChacater.level;
        var PCClass = CurrentPlayerChacater.characterClass;
        var missingSpellLevels = getMissingSpellLevels(PCClass);
        var PCSpellLevel = 0, i = 0, j = 0;

        $("#spell-level").find("option").remove();

        if (PCClass == "Bard" || PCClass == "Cleric" || PCClass == "Druid" || PCClass == "Sorcerer" || PCClass == "Warlock" || PCClass == "Wizard") {
            PCSpellLevel = showFullCaster(PCLevel);
        }
        else if (PCClass == "Paladin" || PCClass == "Ranger") {
            PCSpellLevel = showHalfCaster(PCLevel);
        }
        else if (PCClass == "Fighter" || PCClass == "Rogue") {
            PCSpellLevel = showOneThirdCaster(PCLevel);
        }
        else if (PCClass == "Monk") {
            PCSpellLevel = showMonk(PCLevel);
        }

        $("#spell-level").append(new Option("", ""));

        if (PCClass == "Paladin" || PCClass == "Ranger" || PCClass == "Monk") {
            i = 2;
        }
        else {
            i = 1;
        }

        for (; i <= PCSpellLevel + 1; i++) {
            if (missingSpellLevels == -1) {
                $("#spell-level").append(new Option(spellLevelText[i], spellElementArray[i]));
            }
            else {
                if (j > missingSpellLevels.length - 1) {
                    missingSpellLevels = -1;
                    $("#spell-level").append(new Option(spellLevelText[i], spellElementArray[i]));
                }
                else if (spellLevelText[i] == missingSpellLevels[j]) {
                    j++;
                }
                else {
                    $("#spell-level").append(new Option(spellLevelText[i], spellElementArray[i]));
                }
            }
        }
    };

    function getMissingSpellLevels(PCClass) {
        if (PCClass == "Bard") {
            return BardMissingSpellLevels;
        }
        else if (PCClass == "Cleric") {
            return ClericMissingSpellLevels;
        }
        else if (PCClass == "Ranger") {
            return RangerMissingSpellLevels;
        }
        else if (PCClass == "Rogue") {
            return RogueMissingSpellLevels;
        }
        else {
            return -1;
        }
    };

    function showFullCaster(PCLevel) {
        if (PCLevel > 18) {
            PCLevel = 18;
        }
        if (PCLevel % 2 == 0) {
            return (PCLevel / 2);
        }
        else {
            PCLevel = PCLevel / 2;
            PCLevel = PCLevel + 0.5;
            return PCLevel;
        }
    };

    function showHalfCaster(PCLevel) {
        if (PCLevel == 1) {
            return -1;
        }
        else {
            for (var i = 0; i < 4; i++) {
                if (PCLevel % 4 == 0) {
                    break;
                }
                PCLevel++;
            }
            return (PCLevel / 4);
        }
    };

    function showOneThirdCaster(PCLevel) {
        if (PCLevel <= 2) {
            return -1;
        }
        else if (PCLevel >= 3 && PCLevel <= 6) {
            return 1;
        }
        else if (PCLevel >= 7 && PCLevel <= 12) {
            return 2;
        }
        else if (PCLevel >= 13 && PCLevel <= 18) {
            return 3;
        }
        else if (PCLevel == 19 || PCLevel == 20) {
            return 4;
        }
        else {
            return -1;
        }
    };

    function showMonk(PCLevel) {
        if (PCLevel <= 2) {
            return -1;
        }
        else if (PCLevel >= 3 && PCLevel <= 5) {
            return 1;
        }
        else if (PCLevel >= 6 && PCLevel <= 10) {
            return 2;
        }
        else if (PCLevel >= 11 && PCLevel <= 16) {
            return 3;
        }
        else if (PCLevel >= 17 && PCLevel <= 20) {
            return 5;
        }
        else {
            return -1;
        }
    };

    $("#playerCharacter-class").change(function () {
        addStatLabel();
    });

    $("#spellLevel0-select, #select-levelCast").change(function () {
        $("#output").empty();
    });

    $("#select-spellLevel1, #select-spellLevel2, #select-spellLevel3, #select-spellLevel4, #select-spellLevel5, #select-spellLevel6, #select-spellLevel7, #select-spellLevel8, #select-spellLevel9").click(function () {
        $("#output").empty();
        $("#spellCastButton").hide();
    });

    $("#select-spellLevel1, #select-spellLevel2, #select-spellLevel3, #select-spellLevel4, #select-spellLevel5, #select-spellLevel6, #select-spellLevel7, #select-spellLevel8, #select-spellLevel9").change(function () {
        var spell = $(this).val();
        showLevelCast(spell[0]);
    });

    $("#returnPlayerCharacter").click(function () {
        $("#spellCaster").hide();
        $("#playerCharacter-Data").show();
    });

    $("#spell-level").change(function () {

        var spellLevel = $("#spell-level").val();
        showSpellList(spellLevel);
        loadLevelCast();
        clearSpells();

        var pcClass = CurrentPlayerChacater.characterClass;
        var spellLevel = document.getElementById("spell-level").value;
        var cantripArray = getCantripArray(pcClass);
        var spellArray = getSpellArray(pcClass);
        var spellCount = 0;

        if (spellLevel == "cantrips") {
            if (cantripArray != -1) {
                $("#spellLevel0-select").attr("size", cantripArray.length);
                for (var i = 0; cantripArray.length; i++) {
                    $("#spellLevel0-select").append(new Option(cantripArray[i].cantripName, cantripArray[i].ID));
                }
            }
        }
        else {
            spellLevel = spellLevel.substring(5, 6);
            for (var i = 0; i < spellArray.length; i++) {
                if (spellArray[i].spellLevel == spellLevel) {
                    $("#select-spellLevel" + spellLevel).append(new Option(spellArray[i].spellName, spellArray[i].ID));
                    spellCount++;
                }
            }

            $("#select-spellLevel" + spellLevel).attr("size", spellCount);
            spellCount = 0;
        }
    });

    $("#spellLevel0-select").change(function () {
        var cantrip = $("#spellLevel0-select").val();
        selectCantrip(cantrip);
    });

    $("#select-levelCast").change(function () {
        if (currentSpell.spellName != "Animate Objects") {
            var levelCastAt = $("#select-levelCast").val();
            showCastSpell(levelCastAt);
        }
    });

    $("#castSpell").click(function () {
        castSpell();
    });

    function clearSpells() {
        $("#spellLevel0-select").find("option").remove();
        $("#select-spellLevel1").find("option").remove();
        $("#select-spellLevel2").find("option").remove();
        $("#select-spellLevel3").find("option").remove();
        $("#select-spellLevel4").find("option").remove();
        $("#select-spellLevel5").find("option").remove();
        $("#select-spellLevel6").find("option").remove();
        $("#select-spellLevel7").find("option").remove();
        $("#select-spellLevel8").find("option").remove();
        $("#select-spellLevel9").find("option").remove();
    };

    function getCantripArray(PCClass) {
        if (PCClass == "Bard") {
            return BardCantripArray;
        }
        else if (PCClass == "Cleric") {
            return ClericCantripArray;
        }
        else if (PCClass == "Druid") {
            return DruidCantripArray;
        }
        else if (PCClass == "Sorcerer") {
            return SorcererCantripArray;
        }
        else if (PCClass == "Warlock") {
            return WarlockCantripArray;
        }
        else if (PCClass == "Fighter" || PCClass == "Rogue" || PCClass == "Wizard") {
            return WizardCantripArray;
        }
        else {
            return -1;
        }
    }

    function getSpellArray(PCClass) {
        if (PCClass == "Bard") {
            return BardSpellArray;
        }
        else if (PCClass == "Cleric") {
            return ClericSpellArray;
        }
        else if (PCClass == "Druid") {
            return DruidSpellArray;
        }
        else if (PCClass == "Fighter") {
            return EldritchKnightSpellArray;
        }
        else if (PCClass == "Monk") {
            return WoFEMonkSpellArray;
        }
        else if (PCClass == "Paladin") {
            return PaladinSpellArray;
        }
        else if (PCClass == "Ranger") {
            return RangerSpellArray;
        }
        else if (PCClass == "Rogue") {
            return ATRogueSpellArray;
        }
        else if (PCClass == "Sorcerer") {
            return SorcererSpellArray;
        }
        else if (PCClass == "Warlock") {
            return WarlockSpellArray;
        }
        else if (PCClass == "Wizard") {
            return WizardSpellArray;
        }
    }

    function loadLevelCast() {
        var spellLevel = $("#spell-level option:selected").text();
        var maxSpellLevel = PCMaxSpellLevel();
        spellLevel = spellLevel.slice(0, -2);
        if (spellLevel != "Cantr") {
            spellLevel = parseInt(spellLevel);
            $("#select-levelCast").empty();
            $("#select-levelCast").append(new Option("", ""));
            for (var i = spellLevel; i <= maxSpellLevel; i++) {
                $("#select-levelCast").append(new Option(spellLevelText[i + 1], i));
            }
        }
    }

    function PCMaxSpellLevel() {
        var PCSpellLevel = 0;
        var PCLevel = CurrentPlayerChacater.level;
        var PCClass = CurrentPlayerChacater.characterClass;
        if (PCClass == "Bard" || PCClass == "Cleric" || PCClass == "Druid" || PCClass == "Sorcerer" || PCClass == "Warlock" || PCClass == "Wizard") {
            PCSpellLevel = showFullCaster(PCLevel);
        }
        else if (PCClass == "Paladin" || PCClass == "Ranger") {
            PCSpellLevel = showHalfCaster(PCLevel);
        }
        else if (PCClass == "Fighter" || PCClass == "Rogue") {
            PCSpellLevel = showOneThirdCaster(PCLevel);
        }
        else if (PCClass == "Monk") {
            PCSpellLevel = showMonk(PCLevel);
        }

        return PCSpellLevel;
    }
});


function hideSpellElements() {
    for (var i = 1; i < spellElementArray.length; i++) {
        document.getElementById(spellElementArray[i]).style.display = "none";
    }
};


function resetSpellSelections() {
    for (var i = 0; i < spellElementArray.length; i++) {
        if (document.getElementById(spellElementArray[i]).selected) {
            document.getElementById(spellElementArray[i]).selected = false;
        }
    }
};

var showspellCaster = function(){
    document.getElementById("spellCaster").style.display = "block";
    document.getElementById("spell-level").selectedIndex = "0";
    hideSpellElements();
    document.getElementById("playerCharacter-Data").style.display = "none";
    return true;
};

function showPlayerCharacter() {
    document.getElementById("spellCaster").style.display = "none";
    document.getElementById("playerCharacter-Data").style.display = "block";
    return true;
};

function showSpellList(selectedLevel) {
    hideSpellElements();
    document.getElementById(selectedLevel).style.display = "block";
};

function selectCantrip(selectLevel) {
    if (selectLevel != "") {
        document.getElementById("spellCastButton").style.display = "block";

        for (var i = 0; i < cantripArray.length; i++) {
            if (selectLevel == cantripArray[i].ID) {
                currentSpell = cantripArray[i];
                currentSpell.characterLevel = CurrentPlayerChacater.level;
                break;
            }
        }
    }
    else {
        document.getElementById("spellCastButton").style.display = "none";
    }
}


function showLevelCast(spell) {
    document.getElementById("select-levelCast").selectedIndex = 0;
    if (spell != "") {
        currentID = spell;
        for (var i = 0; i < spellArray.length; i++) {
            if (currentID == spellArray[i].ID) {
                currentSpell = spellArray[i];
            }
        }

        //console.log(currentSpell);

        document.getElementById("levelCast").style.display = "block";
    }
    else {
        document.getElementById("levelCast").style.display = "none";
    }
}

function showCastSpell(castLevel) {
    if (castLevel != "") {
        document.getElementById("spellCastButton").style.display = "block";

        currentSpell.levelCastAt = castLevel;
    } else {
        document.getElementById("spellCastButton").style.display = "none";
    }
}

function castSpell() {
    document.getElementById("spellOutput").style.display = "block";
    document.getElementById("output").innerHTML = currentSpell.cast();
}

class PlayerChacater {
    constructor(ID, characterClass, level, proficiency, castingScore, castingModifier) {
        this.ID = ID;
        this.characterClass = characterClass;
        this.level = level;
        this.proficiency = proficiency;
        this.castingScore = castingScore;
        this.castingModifier = castingModifier;
    }

    setCharacterClass() {
        this.characterClass = document.getElementById("playerCharacter-class").value;
    }

    setCharacterLevel() {
        this.level = document.getElementById("chacaterLevel-select").value;
        this.proficiency = this.calculateProficiency();
    }

    setCharacterCastingScore() {
        this.castingScore = document.getElementById("playerCharacter-CASTSTAT").value;
        this.castingModifier = this.calculateCastingMod();
    }

    calculateCastingMod() {
        var mod = (this.castingScore - 10) / 2;
        return Math.floor(mod);
    }

    calculateProficiency() {
        if (this.level >= 1 && this.level <= 4) {
            return 2;
        }
        else if (this.level >= 5 && this.level <= 8) {
            return 3;
        }
        else if (this.level >= 9 && this.level <= 12) {
            return 4;
        }
        else if (this.level >= 13 && this.level <= 16) {
            return 5;
        }
        else if (this.level >= 17 && this.level <= 20) {
            return 6;
        }

        return -1;
    }

    calculateDCAttackMod() {
        var spellSaveDC = 8 + this.proficiency + this.castingModifier;
        var saveDCOut = "<b>Spell Save DC: </b>" + spellSaveDC;
        document.getElementById("spell-SaveDC").innerHTML = saveDCOut;

        var spellAttackMod = this.proficiency + this.castingModifier;
        var spellAttackOut = "<b>Spell Attack Mod: </b>" + spellAttackMod;
        document.getElementById("spell-AttackMod").innerHTML = spellAttackOut;

        //console.log(8 + " " + this.proficiency + " " + this.castingModifier + " " + saveDCOut);
        //console.log(this.proficiency + " " + this.castingModifier + " " + spellAttackOut);
    }

    calculateCharacter() {
        this.setCharacterClass();
        this.setCharacterLevel();
        this.setCharacterCastingScore();

        this.calculateDCAttackMod();
    }
}

const CurrentPlayerChacater = new PlayerChacater("PC-ID", "Bard", 1, 2, 8, -1);

class DamagingCantrip {
    constructor(ID, cantripName, characterLevel, damageDice, damageType, cantripType, saveStat) {
        this.ID = ID;
        this.cantripName = cantripName;
        this.characterLevel = characterLevel;
        this.damageDice = damageDice;
        this.damageType = damageType;
        this.cantripType = cantripType;
        this.saveStat = saveStat;
    }

    cast() {
        var numberDamageDice = 0, totalDamage = 0;
        var diceArray;

        numberDamageDice = this.checkCharacterLevel();
        diceArray = this.castCantrip(numberDamageDice);

        for (var i = 0; i < numberDamageDice; i++) {
            totalDamage = totalDamage + diceArray[i];
        }

        var diceArrayString = diceArray.join(", ");

        if (this.cantripType == "attack roll") {
            return ("Make an attack roll using your spell attack. On a hit " +
                this.cantripName + " deals <b>" + totalDamage +
                "</b> [" + diceArrayString + "] " + this.damageType +
                " damage to them.");
        }
        else {
            return ("Target must make a <b>" + this.saveStat +
                "</b> save against your spell save DC. On a failure " +
                this.cantripName + " deals <b>" + totalDamage +
                "</b> [" + diceArrayString + "] " + this.damageType +
                " damage to them.");
        }
    }

    checkCharacterLevel() {
        if (this.characterLevel < 5 || this.cantripName == "Magic Stone" || this.cantripName == "Shillelagh") {
            return 1;
        }
        if (this.characterLevel >= 5 && this.characterLevel < 11) {
            return 2;
        }
        if (this.characterLevel >= 11 && this.characterLevel < 17) {
            return 3;
        }
        if (this.characterLevel >= 17) {
            return 4;
        }

        return 1;
    }

    castCantrip(numberDamageDice) {
        var rolledNumber = 0;
        var rolledArray = new Array(numberDamageDice);

        for (var i = 0; i < numberDamageDice; i++) {
            rolledNumber = Math.floor(Math.random() * this.damageDice) + 1;
            rolledArray[i] = rolledNumber;
        }

        return rolledArray;
    }
}

const acidSpl = new DamagingCantrip("can-as", "Acid Splash", 1, 6, "acid", "save", "Dexterity");
const chillTou = new DamagingCantrip("can-ct", "Chill Touch", 1, 8, "necrotic", "attack roll", "");
const createBon = new DamagingCantrip("can-cb", "Create Bonfire", 1, 8, "fire", "save", "Dexterity");
const eldritchBlast = new DamagingCantrip("can-eb", "Eldritch Blast", 1, 10, "force", "attack roll", "");
const fireBolt = new DamagingCantrip("can-fb", "Fire Bolt", 1, 10, "fire", "attack roll", "");
const forstbite = new DamagingCantrip("can-f", "Forstbite", 1, 6, "cold", "save", "Constitution");
const infestation = new DamagingCantrip("can-i", "Infestation", 1, 6, "poison", "save", "Constitution");
const lightningLure = new DamagingCantrip("can-ll", "Lightning Lure", 1, 8, "lightning", "save", "Strength");
const magicStone = new DamagingCantrip("can-ms", "Magic Stone", 1, 6, "bludgeoning", "attack roll", "");
const poisonSp = new DamagingCantrip("can-ps", "Poison Spray", 1, 12, "poison", "save", "Constitution");
const primeSav = new DamagingCantrip("can-prs", "Primal Savagery", 1, 10, "acid", "attack roll", "");
const prodFlame = new DamagingCantrip("can-pf", "Produce Flame", 1, 8, "fire", "attack roll", "");
const rayOfForst = new DamagingCantrip("can-rof", "Ray of Forst", 1, 8, "cold", "attack roll", "");
const sacrFlame = new DamagingCantrip("can-sf", "Sacred Flame", 1, 8, "radiant", "save", "Dexterity");
const shillelagh = new DamagingCantrip("can-s", "Shillelagh", 1, 8, "bludgeoning", "attack roll", "");
const shockGrasp = new DamagingCantrip("can-sg", "Shocking Grasp", 1, 8, "lighting", "attack roll", "");
const swordBurst = new DamagingCantrip("can-sb", "Sword Burst", 1, 6, "force", "save", "Dexterity");
const thornWhip = new DamagingCantrip("can-tw", "Thorn Whip", 1, 6, "piercing", "attack roll", "");
const thunderclap = new DamagingCantrip("can-tc", "Thunderclap", 1, 6, "thunder", "save", "Constitution");
const tollTheDead = new DamagingCantrip("can-ttd", "Toll the Dead (d8)", 1, 8, "necrotic", "save", "Wisdom");
const tollTheDead2 = new DamagingCantrip("can-ttd2", "Toll the Dead (d12)", 1, 12, "necrotic", "save", "Wisdom");
const viciousMock = new DamagingCantrip("can-vm", "Vicious Mockery", 1, 4, "psychic", "save", "Wisdom");
const wordOfRad = new DamagingCantrip("can-wr", "Word of Radiance", 1, 6, "radiance", "save", "Constitution");

var cantripArray = [
    acidSpl,
    chillTou,
    createBon,
    eldritchBlast,
    fireBolt,
    forstbite,
    infestation,
    lightningLure,
    magicStone,
    poisonSp,
    primeSav,
    prodFlame,
    rayOfForst,
    sacrFlame,
    shillelagh,
    shockGrasp,
    swordBurst,
    thornWhip,
    thunderclap,
    tollTheDead,
    tollTheDead2,
    viciousMock,
    wordOfRad
];

var BardCantripArray = [
    thunderclap,
    viciousMock
];
var ClericCantripArray = [
    sacrFlame,
    tollTheDead,
    tollTheDead2,
    wordOfRad
];
var DruidCantripArray = [
    createBon,
    forstbite,
    infestation,
    magicStone,
    poisonSp,
    primeSav,
    prodFlame,
    shillelagh,
    thornWhip,
    thunderclap
];
var EldritchKnightCantripArray = [
    fireBolt,
    rayOfForst,
    shockGrasp
];
var SorcererCantripArray = [
    acidSpl,
    chillTou,
    createBon,
    fireBolt,
    forstbite,
    infestation,
    lightningLure,
    poisonSp,
    rayOfForst,
    sacrFlame,
    shockGrasp,
    swordBurst,
    thunderclap,
    tollTheDead,
    tollTheDead2,
    wordOfRad
];
var WarlockCantripArray = [
    chillTou,
    createBon,
    eldritchBlast,
    forstbite,
    infestation,
    lightningLure,
    magicStone,
    poisonSp,
    sacrFlame,
    swordBurst,
    thunderclap,
    tollTheDead,
    tollTheDead2
];
var WizardCantripArray = [
    acidSpl,
    chillTou,
    createBon,
    fireBolt,
    forstbite,
    infestation,
    lightningLure,
    poisonSp,
    rayOfForst,
    shockGrasp,
    swordBurst,
    thunderclap,
    tollTheDead,
    tollTheDead2
];

class DamagingSpell {
    constructor(ID, spellName, spellLevel, levelCastAt, damageDice, numberDamageDice, numberDamageDicePerLevel,
        damageType, damageDice2, numberDamageDice2, numberDamageDicePerLevel2, damageType2, damagBonusType,
        damageBonus, damageBonusPerDice, spellType, saveStat) {
        this.ID = ID;
        this.spellName = spellName;
        this.spellLevel = spellLevel;
        this.levelCastAt = levelCastAt;
        this.damageDice = damageDice;
        this.numberDamageDice = numberDamageDice;
        this.numberDamageDicePerLevel = numberDamageDicePerLevel;
        this.damageType = damageType;
        this.damageDice2 = damageDice2;
        this.numberDamageDice2 = numberDamageDice2;
        this.numberDamageDicePerLevel2 = numberDamageDicePerLevel2;
        this.damageType2 = damageType2;
        this.damagBonusType = damagBonusType;
        this.damageBonus = damageBonus
        this.damageBonusPerDice = damageBonusPerDice;
        this.spellType = spellType;
        this.saveStat = saveStat;
    }

    cast() {
        var returnString = "", secondaryTotalDice = -1, secondaryDamageArray, secondaryDiceString,
            secondaryDamage = 0, secondaryHalfDamage, secondaryHalfDamageUp, secondaryHalfDamageDown;
        var totalDice = this.checkLevel();
        var bonusDamage = this.getDamageBonus(totalDice);
        var damageArray = this.rollSpellDice(totalDice, this.damageDice);
        var diceString = damageArray.join(", ");
        var totalDamage = 0;

        for (var i = 0; i < damageArray.length; i++) {
            totalDamage = totalDamage + damageArray[i];
        }
        totalDamage = totalDamage + bonusDamage;

        var halfDamage = totalDamage / 2;
        var halfDamageUp = Math.ceil(halfDamage);
        var halfDamageDown = Math.floor(halfDamage);

        var attackRollSpell = "Make an attack roll(s) using your spell attack. On a hit ";
        var saveSpell = "Target must make a <b>" + this.saveStat + "</b> save against your spell save DC. On a failure ";

        if (this.damageDice2 != -1) {
            secondaryTotalDice = this.checkLevelSecondaryDamage();
            secondaryDamageArray = this.rollSpellDice(secondaryTotalDice, this.damageDice2);
            secondaryDiceString = secondaryDamageArray.join(", ");

            for (var i = 0; i < secondaryDamageArray.length; i++) {
                secondaryDamage = secondaryDamage + secondaryDamageArray[i];
            }
            secondaryHalfDamage = secondaryDamage / 2;
            secondaryHalfDamageUp = Math.ceil(secondaryHalfDamage);
            secondaryHalfDamageDown = Math.floor(secondaryHalfDamage);
        }

        if (this.spellType == "attack roll" || this.spellType == "save" || this.spellType == "none") {
            returnString = this.spellName + " deals <b>" + totalDamage + "</b> [" + diceString;

            if (this.spellType == "attack roll") {
                returnString = attackRollSpell + returnString;
            }
            else if (this.spellType == "save") {
                returnString = saveSpell + returnString;
            }

            if (bonusDamage > 0) {
                returnString = returnString + " + " + bonusDamage + "] " + this.damageType + " damage";
            }
            else {
                returnString = returnString + "] " + this.damageType + " damage";
            }

            if (this.damageDice2 != -1) {
                returnString = returnString + " and " + secondaryDamage + " [" + secondaryDiceString + "] " + this.damageType2;
            }

            returnString = returnString + ".";

            if (this.spellType == "save") {
                returnString = returnString + " Those affected take half as much on a successful save: " + " (Rounded Up " + halfDamageUp + " / Rounded down " + halfDamageDown + ") " + this.damageType;
                if (this.damageDice2 != -1) {
                    returnString = returnString + " and (Rounded Up " + secondaryHalfDamageUp + " / Rounded Down " + secondaryHalfDamageDown + ") " + this.damageType2;
                }
                returnString = returnString + ".";
            }

            if (this.spellName == "Tsunami") {
                returnString = returnString + " The damage creatures take from the spell on subsequent rounds is reduced by 1d10.";
            }
        }
        else if (this.spellType == "healing") {
            returnString = this.spellName + " heals for " + totalDamage + " [" + diceString;
            if (bonusDamage > 0) {
                returnString = returnString + " + " + bonusDamage;
            }
            returnString = returnString + "].";
        }
        else if (this.spellType == "iceKnife") {
            returnString = "Make a ranged spell attack against a target within rage. On a hit " + this.spellName + " deals <b>" + totalDamage + "</b> [" + diceString + "] " + this.damageType + " damage.";
            returnString = returnString + " Hit or miss, the shard then explodes. The target and each creature within 5 feet of it must make a <b>" + this.saveStat + "</b> save against your spell save DC. On a failure ";
            returnString = returnString + this.spellName + " deals <b>" + secondaryDamage + "</b> [" + secondaryDiceString + "] " + this.damageType2 + ". Those affected take half as much on a successful save: ";
            returnString = returnString + "(Rounded Up " + secondaryHalfDamageUp + " / Rounded Down " + secondaryHalfDamageDown + ") " + this.damageType2 + ".";
        }
        else if (this.spellType == "stormSphere") {
            returnString = "Each creature in the sphere when it appears or that ends its turn there must succeed on a <b>" + this.saveStat + "</b> saving throw or take <b>" + totalDamage + "</b> [" + diceString + "] <b>" + this.damageType + "</b> damage. ";
            returnString = returnString + "Until the spell ends, you can use a bonus action on each of your turns to cause a bolt of lightning to leap from the center of the sphere. Make a <b>ranged spell attack.</b> You have advantage on the attack roll if the target is in the sphere. On a hit, the target takes ";
            returnString = returnString + "<b>" + secondaryDamage + "</b> [" + secondaryDiceString + "] <b>" + this.damageType2 + "</b> damage."
        }
        else if (this.spellType == "wallOfIce") {
            var saves = this.saveStat;
            saves = saves.split("|");
            returnString = "If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall and must make a <b>" + saves[0];
            returnString = returnString + "</b> save. On a failed save, the creature takes <b>" + totalDamage + "</b> [" + diceString + "] " + this.damageType + " damage. ";
            returnString = returnString + "Or or half as much damage on a successful save: (Rounded Up " + halfDamageUp + " / Rounded down " + halfDamageDown + ") " + this.damageType;
            returnString = returnString + ". If a part of the wall is destroyed creatues creature moving through the sheet of frigid air must make a <b>" + saves[1];
            returnString = returnString + "</b> saving throw. On a failed save, the creature takes <b>" + secondaryDamage + "</b> [" + secondaryDiceString + "] " + this.damageType2;
            returnString = returnString + " Or or half as much damage on a successful save: (Rounded Up " + secondaryHalfDamageUp + " / Rounded Down " + secondaryHalfDamageDown + ") " + this.damageType2 + ".";
        }
        else if (this.spellType == "wallOfThorns") {
            returnString = "When the wall appears, each creature within its area must make a <b>" + this.saveStat + "</b> saving throw. On a failed save, a creature takes <b>";
            returnString = returnString + totalDamage + "</b> [" + diceString + "] " + this.damageType + " damage. Or or half as much damage on a successful save: (Rounded Up ";
            returnString = returnString + halfDamageUp + " / Rounded down " + halfDamageDown + ") " + this.damageType + ". The first time a creature enters the wall on a turn or ends its turn there, the creature must make a <b>";
            returnString = returnString + this.saveStat + "</b> saving throw. On a failed save, a creature takes <b>" + secondaryDamage + "</b> [" + secondaryDiceString + "] " + this.damageType2;
            returnString = returnString + " Or or half as much damage on a successful save: (Rounded Up " + secondaryHalfDamageUp + " / Rounded Down " + secondaryHalfDamageDown + ") " + this.damageType2 + ".";
        }
        else if (this.spellType == "total HP") {
            returnString = this.spellName + " has a pool of " + totalDamage + " hit points. Creatures in range are affected in ascending order of their current hit points. ";
            returnString = returnString + "Subtract each creature’s hit points from the total before moving on to the creature with the next lowest hit points.";
            returnString = returnString + " A creature’s hit points must be equal to or less than the remaining total for that creature to be affected."
        }

        return returnString;
    }

    rollSpellDice(totalDice, damageDiceType) {
        var rolledNumber = 0;
        var rolledArray = new Array(totalDice);

        for (var i = 0; i < totalDice; i++) {
            rolledNumber = Math.floor(Math.random() * damageDiceType) + 1;
            rolledArray[i] = rolledNumber;
        }

        return rolledArray;
    }

    checkLevel() {
        var difference = 0;

        if (this.levelCastAt > 9) {
            this.levelCastAt = 9;
        }

        if (this.levelCastAt < this.spellLevel) {
            this.levelCastAt = this.spellLevel;
        }

        if (this.levelCastAt > this.spellLevel) {
            difference = this.levelCastAt - this.spellLevel;
            difference = difference * this.numberDamageDicePerLevel;
        }

        if (this.spellName == "Shadow Blade") {
            difference = Math.ceil(difference);

            if (difference > 3) {
                difference = 3;
            }
        }

        return this.numberDamageDice + difference;
    }

    getDamageBonus(totalDice) {
        if (this.damagBonusType == "none") {
            return 0;
        }
        else if (this.damagBonusType == "flat") {
            if (this.damageBonus > 0) {
                return this.damageBonus;
            }
            else if (this.damageBonusPerDice > 0) {
                return (this.damageBonusPerDice * totalDice);
            }
        }
        else if (this.damagBonusType == "mod") {
            return CurrentPlayerChacater.castingModifier;
        }
    }

    checkLevelSecondaryDamage() {
        var difference = this.levelCastAt - this.spellLevel;
        difference = difference * this.numberDamageDicePerLevel2;
        return this.numberDamageDice2 + difference;
    }
}

class AnimateObjects {
    constructor(ID, spellName, spellLevel, levelCastAt, availableObjects, totalTinyObjects, totalSmallObjects,
        totalMediumObjects, totalLargeObjects, totalHugeObjects) {
        this.ID = ID;
        this.spellName = spellName;
        this.spellLevel = spellLevel;
        this.levelCastAt = levelCastAt;
        this.availableObjects = availableObjects;
        this.totalTinyObjects = totalTinyObjects;
        this.totalSmallObjects = totalSmallObjects;
        this.totalMediumObjects = totalMediumObjects;
        this.totalLargeObjects = totalLargeObjects;
        this.totalHugeObjects = totalHugeObjects;
    }

    cast() {

    }

    rollAttacks() {
        var totalObjects = [
            this.totalTinyObjects,
            this.totalSmallObjects,
            this.totalMediumObjects,
            this.totalLargeObjects,
            this.totalHugeObjects
        ];

        var objectDiceType = [
            4,
            8,
            6,
            10,
            12
        ];

        var diceCount = 0;

        for (var i = 0; i < totalObjects.length; i++) {
            if (i >= 2) {
                diceCount = totalObjects[i] * 2;
            }
            else {
                diceCount = totalObjects[i];
            }
            //???
            this.rollSpellDice(diceCount, objectDiceType[i]);
        }
    }

    rollSpellDice(totalDice, damageDiceType) {
        var rolledNumber = 0;
        var rolledArray = new Array(totalDice);

        for (var i = 0; i < totalDice; i++) {
            rolledNumber = Math.floor(Math.random() * damageDiceType) + 1;
            rolledArray[i] = rolledNumber;
        }

        return rolledArray;
    }

    setAvailableObjects() {
        if (this.levelCastAt == 5) {
            this.availableObjects = 10;
        }
        else {
            var diff = this.levelCastAt - 5;
            diff = diff * 2;
            this.availableObjects = diff + 10;
        }
    }

    getObjectTotalCost() {
        var totalCost = this.totalTinyObjects + this.totalSmallObjects + (this.totalMediumObjects * 2) + (this.totalLargeObjects * 4) + (this.totalHugeObjects * 8);
        return totalCost;
    }

    setTinyObjects() {
        this.totalTinyObjects = document.getElementById("AO-tiny-objects").value;
    }

    setSmallObjects() {
        this.totalSmallObjects = document.getElementById("AO-small-objects").value;
    }

    setMediumObjects() {
        this.totalMediumObjects = document.getElementById("AO-medium-objects").value;
    }

    setLargeObjects() {
        this.totalLargeObjects = document.getElementById("AO-large-objects").value;
    }

    setHugeObjects() {
        this.totalHugeObjects = document.getElementById("AO-huge-objects").value;
    }
}

const animateObjects = new AnimateObjects("s5-ao", "Animate Objects", 5, 5, 10, 0, 0, 0, 0, 0);

//First Level Spells
const absorbElements = new DamagingSpell("s1-ae", "Absorb Elements", 1, 1, 6, 1, 1, "", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const armsOfHad = new DamagingSpell("s1-aoh", "Arms of Hadar", 1, 1, 6, 2, 1, "necrotic", -1, -1, -1, "", "none", 0, 0, "save", "Strength");
const burningHand = new DamagingSpell("s1-bh", "Burning Hands", 1, 1, 6, 3, 1, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const catapult = new DamagingSpell("s1-cata", "Catapult", 1, 1, 8, 3, 1, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const chaosBolt = new DamagingSpell("s1-cb", "Chaos Bolt", 1, 1, 8, 2, 0, "", 6, 1, 1, "", "none", 0, 0, "attack roll", "");
const chromOrb = new DamagingSpell("s1-co", "Chromatic Orb", 1, 1, 8, 3, 1, "", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const colorSp = new DamagingSpell("s1-cs", "Color Spray", 1, 1, 10, 6, 2, "", -1, -1, -1, "", "none", 0, 0, "total HP", "");
const cureWound = new DamagingSpell("s1-cw", "Cure Wounds", 1, 1, 8, 1, 1, "healing", -1, -1, -1, "none", "mod", 0, 0, "healing", "");
const dissWhisper = new DamagingSpell("s1-dw", "Dissonant Whispers", 1, 1, 6, 3, 1, "psychic", -1, -1, -1, "", "none", 0, 0, "save", "Wisdom");
const earthTrem = new DamagingSpell("s1-et", "Earth Tremor", 1, 1, 6, 1, 1, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const ensnarStrike = new DamagingSpell("s1-es", "Ensnaring Strike", 1, 1, 6, 1, 1, "piercing", -1, -1, -1, "", "none", 0, 0, "save", "Strength");
const guidBolt = new DamagingSpell("s1-gb", "Guiding Bolt", 1, 1, 6, 4, 1, "radiant", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const hailOfThorn = new DamagingSpell("s1-hot", "Hail of Thorns", 1, 1, 10, 1, 1, "piercing", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const healWord = new DamagingSpell("s1-hw", "Healing Word", 1, 1, 4, 1, 1, "healing", -1, -1, -1, "", "mod", 0, 0, "healing", "");
const hellRebuke = new DamagingSpell("s1-hr", "Hellish Rebuke", 1, 1, 10, 2, 1, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const iceKnife = new DamagingSpell("s1-ik", "Ice Knife", 1, 1, 10, 1, 0, "piercing", 6, 2, 1, "cold", "none", 0, 0, "iceKnife", "Dexterity");
const inflictWound = new DamagingSpell("s1-iw", "Inflict Wounds", 1, 1, 10, 3, 1, "necrotic", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const magicMissle = new DamagingSpell("s1-mm", "Magic Missle", 1, 1, 4, 3, 1, "force", -1, -1, -1, "", "flat", 0, 1, "none", "");
const rayOfSick = new DamagingSpell("s1-ros", "Ray of Sickness", 1, 1, 8, 2, 1, "poison", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const searSmite = new DamagingSpell("s1-ss", "Searing Smite", 1, 1, 6, 1, 1, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const sleep = new DamagingSpell("s1-s", "Sleep", 1, 1, 8, 5, 2, "", -1, -1, -1, "", "none", 0, 0, "total HP", "");
const thundSmite = new DamagingSpell("s1-ts", "Thunderous Smite", 1, 1, 6, 2, 0, "thunder", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const thunderw = new DamagingSpell("s1-tw", "Thunderwave", 1, 1, 8, 2, 1, "thunder", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const witchBolt = new DamagingSpell("s1-wb", "Witch Bolt", 1, 1, 12, 1, 1, "lightning", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const wrathSmite = new DamagingSpell("s1-ws", "Wrathful Smite", 1, 1, 6, 1, 0, "psychic", -1, -1, -1, "", "none", 0, 0, "save", "Wisdom");
const zephStrike = new DamagingSpell("s1-zs", "Zephyr Strike", 1, 1, 8, 1, 0, "force", -1, -1, -1, "", "none", 0, 0, "attack roll", "");

//Second Level Spells
const agScorch = new DamagingSpell("s2-as", "Aganazzar’s Scorcher", 2, 2, 8, 3, 1, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const brandSmite = new DamagingSpell("s2-bs", "Branding Smite", 2, 2, 6, 2, 1, "radiant", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const cloudDagger = new DamagingSpell("s2-cd", "Cloud of Daggers", 2, 2, 4, 4, 2, "slashing", -1, -1, -1, "", "none", 0, 0, "none", "");
const dragonBre = new DamagingSpell("s2-db", "Dragon’s Breath", 2, 2, 6, 3, 1, "", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const dustDevil = new DamagingSpell("s2-dd", "Dust Devil", 2, 2, 8, 1, 1, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Strength");
const flameBlade = new DamagingSpell("s2-fb", "Flame Blade", 2, 2, 6, 3, 1, "fire", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const flameSph = new DamagingSpell("s2-fs", "Flaming Sphere", 2, 2, 6, 2, 1, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const healSpirit = new DamagingSpell("s2-hs", "Healing Spirit", 2, 2, 1, 1, 1, "healing", -1, -1, -1, "", "none", 0, 0, "healing", "");
const heatMetal = new DamagingSpell("s2-hm", "Heat Metal", 2, 2, 8, 2, 1, "fire", -1, -1, -1, "", "none", 0, 0, "none", "");
const earthGrasp = new DamagingSpell("s2-meg", "Maximilian’s Earthen Grasp", 2, 2, 6, 2, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Strength");
const melfAcidArrow = new DamagingSpell("s2-maa", "Melf's Acid Arrow", 2, 2, 4, 4, 1, "acid", 4, 2, 1, "acid", "none", 0, 0, "attack roll", "");
const mindSpike = new DamagingSpell("s2-ms", "Mind Spike", 2, 2, 8, 3, 1, "psychic", -1, -1, -1, "", "none", 0, 0, "save", "Wisdom");
const moonbeam = new DamagingSpell("s2-mb", "Moonbeam", 2, 2, 10, 2, 1, "radiant", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const paryerOfHealing = new DamagingSpell("s2-poh", "Prayer of Healing", 2, 2, 8, 2, 1, "healing", -1, -1, -1, "", "mod", 0, 0, "healing", "");
const scorchingRay = new DamagingSpell("s2-sr", "Scorching Ray", 2, 2, 6, 6, 2, "fire", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const shadowBlade = new DamagingSpell("s2-sb", "Shadow Blade", 2, 2, 8, 2, 0.5, "psychic", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const shatter = new DamagingSpell("s2-sh", "Shatter", 2, 2, 8, 3, 1, "thunder", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const snowballSt = new DamagingSpell("s2-sss", "Snilloc’s Snowball Swarm", 2, 2, 6, 3, 1, "cold", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const spikeGrow = new DamagingSpell("s2-sg", "Spike Growth", 2, 2, 4, 2, 0, "piercing", -1, -1, -1, "", "none", 0, 0, "none", "");
const spiritualWeapon = new DamagingSpell("s2-sw", "Spiritual Weapon", 2, 2, 8, 1, 1, "force", -1, -1, -1, "", "mod", 0, 0, "attack roll", "");

//Third Level Spell
const blindSmite = new DamagingSpell("s3-bs", "Blinding Smite", 3, 3, 8, 3, 0, "radiant", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const callLightning = new DamagingSpell("s3-cl", "Call Lightning", 3, 3, 10, 3, 1, "lightning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const conjureBarr = new DamagingSpell("s3-cb", "Conjure Barrage", 3, 3, 8, 3, 0, "", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const eruptingEarth = new DamagingSpell("s3-ee", "Erupting Earth", 3, 3, 12, 3, 1, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const fireball = new DamagingSpell("s3-fb", "Fireball", 3, 3, 6, 8, 1, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const glyphOfWardingER = new DamagingSpell("s3-gow", "Glyph of Warding - Explosive Rune", 3, 3, 8, 5, 1, "", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const hungerOfHadar = new DamagingSpell("s3-hoh", "Hunger of Hadar", 3, 3, 6, 2, 0, "cold", 6, 2, 0, "acid", "none", 0, 0, "save", "Dexterity");
const lifeTrans = new DamagingSpell("s3-lt", "Life Transference", 3, 3, 8, 4, 1, "necrotic", -1, -1, -1, "", "none", 0, 0, "none", "");
const lightningArrow = new DamagingSpell("s3-la", "Lightning Arrow", 3, 3, 8, 4, 1, "lightning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const lightningBolt = new DamagingSpell("s3-lb", "Lightning Bolt", 3, 3, 6, 8, 1, "lightning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const massHealingWord = new DamagingSpell("s3-mhw", "Mass Healing Word", 3, 3, 4, 1, 1, "healing", -1, -1, -1, "", "mod", 0, 0, "healing", "");
const melfMinuteMeteor = new DamagingSpell("s3-mmm", "Melf’s Minute Meteors", 3, 3, 6, 2, 0, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const spiritGuard = new DamagingSpell("s3-sg", "Spirit Guardians", 3, 3, 8, 3, 1, "radiant/necrotic", -1, -1, -1, "", "none", 0, 0, "save", "Wisdom");
const thunderStep = new DamagingSpell("s3-ts", "Thunder Step", 3, 3, 10, 3, 1, "thunder", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const tidalWave = new DamagingSpell("s3-tw", "Tidal Wave", 3, 3, 8, 4, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const vampTouch = new DamagingSpell("s3-vt", "Vampiric Touch", 3, 3, 6, 3, 1, "necrotic", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const windWall = new DamagingSpell("s3-ww", "Wind Wall", 3, 3, 8, 3, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Strength");

//Fourth Level Spell
const blight = new DamagingSpell("s4-bl", "Blight", 4, 4, 8, 8, 1, "necrotic", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const controlWater = new DamagingSpell("s4-cw", "Control Water - Whirlpool", 4, 4, 8, 2, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Strength");
const evardBlack = new DamagingSpell("s4-ebt", "Evard’s Black Tentacles", 4, 4, 6, 3, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const fireShield = new DamagingSpell("s4-fs", "Fire Shield", 4, 4, 8, 2, 0, "fire/cold", -1, -1, -1, "", "none", 0, 0, "none", "");
const iceStorm = new DamagingSpell("s4-is", "Ice Storm", 4, 4, 8, 2, 1, "bludgeoning", 6, 4, 0, "cold", "none", 0, 0, "save", "Dexterity");
const mordFaithfulHound = new DamagingSpell("s4-mfh", "Mordenkainen’s Faithful Hound", 4, 4, 8, 4, 0, "piercing", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const phantasmalKiller = new DamagingSpell("s4-pk", "Phantasmal Killer", 4, 4, 10, 4, 1, "psychic", -1, -1, -1, "", "none", 0, 0, "save", "Wisdom");
const shadowMoil = new DamagingSpell("s4-sm", "Shadow of Moil", 4, 4, 8, 2, 0, "necrotic", -1, -1, -1, "", "none", 0, 0, "none", "");
const sickRadiance = new DamagingSpell("s4-sr", "Sickening Radiance", 4, 4, 10, 4, 0, "radiant", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const staggerSmite = new DamagingSpell("s4-ss", "Staggering Smite", 4, 4, 6, 4, 0, "psychic", -1, -1, -1, "", "none", 0, 0, "save", "Wisdom");
const stormSphere = new DamagingSpell("s4-sts", "Storm Sphere", 4, 4, 6, 2, 1, "bludgeoning", 6, 4, 1, "lightning", "none", 0, 0, "stormSphere", "Strength"); 
const vitriolicSphere = new DamagingSpell("s4-vs", "Vitriolic Sphere", 4, 4, 4, 10, 2, "acid", 4, 5, 0, "acid", "none", 0, 0, "save", "Dexterity");
const wallFire = new DamagingSpell("s4-wf", "Wall of Fire", 4, 4, 8, 5, 1, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");

//Fifth Level Spells
//Animate Objects - muti dmg dice types
const banishSmite = new DamagingSpell("s5-bs", "Banishing Smite", 5, 5, 10, 5, 0, "force", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const bigbyFist = new DamagingSpell("s5-bcf", "Bigby’s Clenched Fist", 5, 5, 8, 4, 2, "force", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const bigbysGraspingHand = new DamagingSpell("s5-bgh", "Bigby’s Hand Grasping Hand", 5, 5, 6, 2, 2, "bludgeoning", -1, -1, -1, "", "mod", 0, 0, "attack roll", "");
const cloudkill = new DamagingSpell("s5-ck", "Cloudkill", 5, 5, 8, 5, 1, "poison", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const coneCold = new DamagingSpell("s5-cc", "Cone of Cold", 5, 5, 8, 8, 1, "cold", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const conjVolley = new DamagingSpell("s5-cv", "Conjure Volley", 5, 5, 8, 8, 0, "", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const dawn = new DamagingSpell("s5-d", "Dawn", 5, 5, 10, 4, 0, "radiant", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const destructiveWave = new DamagingSpell("s5-dw", "Destructive Wave", 5, 5, 6, 5, 0, "thunder", 6, 5, 0, " radiant or necrotic", "none", 0, 0, "save", "Constitution");
const enervation = new DamagingSpell("s5-en", "Enervation", 5, 5, 8, 4, 1, "necrotic", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const flameStrike = new DamagingSpell("s5-fs", "Flame Strike", 5, 5, 6, 4, 1, "fire", 6, 4, 0, "radiant", "none", 0, 0, "save", "Dexterity");
const immolation = new DamagingSpell("s5-i", "Immolation", 5, 5, 6, 8, 0, "fire", 6, 4, 0, "fire", "none", 0, 0, "save", "Dexterity");
const insectPlague = new DamagingSpell("s5-ip", "Insect Plague", 5, 5, 10, 4, 1, "piercing", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const maelstrom = new DamagingSpell("s5-ms", "Maelstrom", 5, 5, 6, 6, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Strength");
const massCureWounds = new DamagingSpell("s5-mcw", "Mass Cure Wounds", 5, 5, 8, 3, 1, "healing", -1, -1, -1, "", "mod", 0, 0, "healing", "");
const negEnergyFlood = new DamagingSpell("s5-nef", "Negative Energy Flood", 5, 5, 12, 5, 0, "necrotic", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const steelWind = new DamagingSpell("s5-sws", "Steel Wind Strike", 5, 5, 10, 6, 0, "force", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const synapStatic = new DamagingSpell("s5-ss", "Synaptic Static", 5, 5, 6, 8, 0, "psychic", -1, -1, -1, "", "none", 0, 0, "save", "Intelligence");
const transmuteRock = new DamagingSpell("s5-tr", "Transmute Rock - Falling Mud", 5, 5, 8, 4, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const wallOfLight = new DamagingSpell("s5-wol", "Wall of Light", 5, 5, 8, 5, 1, "radiant", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const wrathOfNatureTrees = new DamagingSpell("s5-wont", "Wrath of Nature - Trees", 5, 5, 6, 4, 0, "slashing", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const wrathOfNatureRocks = new DamagingSpell("s5-wonr", "Wrath of Nature - Rocks", 5, 5, 8, 3, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "attack roll", "");


//Sixth Level Spell
const bladeBarr = new DamagingSpell("s6-bb", "Blade Barrier", 6, 6, 10, 6, 0, "slashing", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const bonesOfTheEarth = new DamagingSpell("s6-bote", "Bones of the Earth", 6, 6, 6, 6, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "none", "");
const chainLightning = new DamagingSpell("s6-cl", "Chain Lightning", 6, 6, 8, 10, 0, "lightning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const circleDeath = new DamagingSpell("s6-cd", "Circle of Death", 6, 6, 6, 8, 2, "necrotic", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const disintegrate = new DamagingSpell("s6-d", "Disintegrate", 6, 6, 6, 10, 3, "force", -1, -1, -1, "", "flat", 40, 0, "save", "Dexterity");
const forbiddance = new DamagingSpell("s6-f", "Forbiddance", 6, 6, 10, 5, 0, "", -1, -1, -1, "", "none", 0, 0, "none", "");
const freezSphere = new DamagingSpell("s6-fs", "Otiluke’s Freezing Sphere", 6, 6, 6, 10, 1, "cold", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const harm = new DamagingSpell("s6-harm", "Harm", 6, 6, 6, 14, 0, "necrotic", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const mentalPrison = new DamagingSpell("s6-mp", "Mental Prison", 6, 6, 10, 5, 0, "psychic", 10, 10, 0, "psychic", "none", 0, 0, "save", "Intelligence");
const sunBeam = new DamagingSpell("s6-sb", "Sun Beam", 6, 6, 8, 6, 0, "radiant", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const wallOfIce = new DamagingSpell("s6-woi", "Wall of Ice", 6, 6, 6, 10, 2, "cold", 6, 5, 1, "cold", "none", 0, 0, "wallOfIce", "Dexterity|Constitution");
const wallOfThorns = new DamagingSpell("s6-wot", "Wall of Thorns", 6, 6, 8, 7, 1, "piercing", 8, 7, 1, "slashing", "none", 0, 0, "wallOfThorns", "Dexterity");

//Seventh Level Spell
const crownStar = new DamagingSpell("s7-cs", "Crown of Stars", 7, 7, 12, 4, 0, "radiant", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const delayedBlastFB = new DamagingSpell("s7-dbf", "Delayed Blast Fireball", 7, 7, 6, 12, 1, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const fingerOfDeath = new DamagingSpell("s7-fod", "Finger of Death", 7, 7, 8, 7, 0, "necrotic", -1, -1, -1, "", "flat", 30, 0, "save", "Constitution");
const fireStorm = new DamagingSpell("s7-fs", "Fire Storm", 7, 7, 10, 7, 0, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const mordenSword = new DamagingSpell("s7-ms", "Mordenkainen’s Sword", 7, 7, 10, 3, 0, "force", -1, -1, -1, "", "none", 0, 0, "attack roll", "");
const prismaticSpray = new DamagingSpell("s7-ps", "Prismatic Spray", 7, 7, 6, 10, 0, "", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const regenerate = new DamagingSpell("s7-r", "Regenerate", 7, 7, 8, 4, 0, "healing", -1, -1, -1, "", "flat", 15, 0, "healing", "");
const symbol = new DamagingSpell("s7-s", "Symbol - Death", 7, 7, 10, 10, 0, "necrotic", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const whirlwind = new DamagingSpell("s7-ww", "Whirlwind", 7, 7, 6, 10, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");

//Eighth Level Spell
const horridWither = new DamagingSpell("s8-hw", "Abi-Dalzim’s Horrid Wilting", 8, 8, 8, 12, 0, "necrotic", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const earthquake = new DamagingSpell("s8-e", "Earthquake", 8, 8, 6, 5, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity ");
const feeblemind = new DamagingSpell("s8-f", "Feeblemind", 8, 8, 6, 4, 0, "psychic", -1, -1, -1, "", "none", 0, 0, "none", "");
const illDragon = new DamagingSpell("s8-id", "Illusory Dragon", 8, 8, 6, 7, 0, "", -1, -1, -1, "", "none", 0, 0, "save", "Intelligence");
const incendCloud = new DamagingSpell("s8-ic", "Incendiary Cloud", 8, 8, 8, 10, 0, "fire", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const madDarkness = new DamagingSpell("s8-md", "Maddening Darkness", 8, 8, 8, 8, 0, "psychic", -1, -1, -1, "", "none", 0, 0, "save", "Wisdom");
const sunburst = new DamagingSpell("s8-sb", "Sun Burst", 8, 8, 6, 12, 0, "radiant", -1, -1, -1, "", "none", 0, 0, "save", "Constitution");
const tsunami = new DamagingSpell("s6-t", "Tsunami", 8, 8, 10, 5, 0, "bludgeoning", -1, -1, -1, "", "none", 0, 0, "save", "Strength");

//Ninth Level Spells
const meteorSwarm = new DamagingSpell("s9-ms", "Meteor Swarm", 9, 9, 6, 20, 0, "fire", 6, 20, 0, "bludgeoning", "none", 0, 0, "save", "Dexterity");
const prismaticWall = new DamagingSpell("s9-pw", "Prismatic Wall", 9, 9, 10, 6, 0, "", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const psychicScream = new DamagingSpell("s9-ps", "Psychic Scream", 9, 9, 6, 14, 0, "psychic", -1, -1, -1, "", "none", 0, 0, "save", "Intelligence");
const stormOfV3 = new DamagingSpell("s9-sv3", "Storm of Vengeance - Round 3", 9, 9, 6, 10, 0, "lightning", -1, -1, -1, "", "none", 0, 0, "save", "Dexterity");
const weird = new DamagingSpell("s9-w", "Weird", 9, 9, 10, 4, 0, "psychic", -1, -1, -1, "", "none", 0, 0, "save", "Wisdom"); //!!!

var spellArray = [
    absorbElements,
    armsOfHad,
    burningHand,
    catapult,
    chaosBolt,
    chromOrb,
    colorSp,
    cureWound,
    dissWhisper,
    earthTrem,
    ensnarStrike,
    guidBolt,
    hailOfThorn,
    healWord,
    hellRebuke,
    iceKnife,
    inflictWound,
    magicMissle,
    rayOfSick,
    searSmite,
    sleep,
    thundSmite,
    thunderw,
    witchBolt,
    wrathSmite,
    zephStrike,
    agScorch,
    brandSmite,
    cloudDagger,
    dragonBre,
    dustDevil,
    flameBlade,
    flameSph,
    healSpirit,
    heatMetal,
    earthGrasp,
    melfAcidArrow,
    mindSpike,
    moonbeam,
    paryerOfHealing,
    scorchingRay,
    shadowBlade,
    shatter,
    snowballSt,
    spikeGrow,
    spiritualWeapon,
    blindSmite,
    callLightning,
    conjureBarr,
    eruptingEarth,
    fireball,
    glyphOfWardingER,
    hungerOfHadar,
    lifeTrans,
    lightningArrow,
    lightningBolt,
    massHealingWord,
    melfMinuteMeteor,
    spiritGuard,
    thunderStep,
    tidalWave,
    vampTouch,
    windWall,
    blight,
    controlWater,
    evardBlack,
    fireShield,
    iceStorm,
    mordFaithfulHound,
    phantasmalKiller,
    shadowMoil,
    sickRadiance,
    staggerSmite,
    stormSphere,
    vitriolicSphere,
    wallFire,
    banishSmite,
    bigbyFist,
    bigbysGraspingHand,
    cloudkill,
    coneCold,
    conjVolley,
    dawn,
    destructiveWave,
    enervation,
    flameStrike,
    immolation,
    insectPlague,
    maelstrom,
    massCureWounds,
    negEnergyFlood,
    steelWind,
    synapStatic,
    transmuteRock,
    wallOfLight,
    wrathOfNatureTrees,
    wrathOfNatureRocks,
    bladeBarr,
    bonesOfTheEarth,
    chainLightning,
    circleDeath,
    disintegrate,
    forbiddance,
    freezSphere,
    harm,
    mentalPrison,
    sunBeam,
    wallOfIce,
    wallOfThorns,
    crownStar,
    delayedBlastFB,
    fingerOfDeath,
    fireStorm,
    mordenSword,
    prismaticSpray,
    regenerate,
    symbol,
    whirlwind,
    horridWither,
    earthquake,
    feeblemind,
    illDragon,
    incendCloud,
    madDarkness,
    sunburst,
    tsunami,
    meteorSwarm,
    prismaticWall,
    psychicScream,
    stormOfV3,
    weird
];

var BardSpellArray = [
    cureWound,
    dissWhisper,
    earthTrem,
    healWord,
    sleep,
    thunderw,
    cloudDagger,
    heatMetal,
    shatter,
    glyphOfWardingER,
    massCureWounds,
    synapStatic,
    mordenSword,
    regenerate,
    symbol,
    feeblemind,
    psychicScream
];

var ClericSpellArray = [
    burningHand,
    cureWound,
    guidBolt,
    healWord,
    inflictWound,
    searSmite,
    thunderw,
    flameSph,
    heatMetal,
    paryerOfHealing,
    scorchingRay,
    shatter,
    spikeGrow,
    spiritualWeapon,
    callLightning,
    fireball,
    glyphOfWardingER,
    lifeTrans,
    massHealingWord,
    spiritGuard,
    vampTouch,
    windWall,
    blight,
    controlWater,
    iceStorm,
    wallFire,
    dawn,
    destructiveWave,
    flameStrike,
    insectPlague,
    massCureWounds,
    bladeBarr,
    forbiddance,
    harm,
    fireStorm,
    regenerate,
    symbol,
    earthquake
];

var DruidSpellArray = [
    absorbElements,
    cureWound,
    earthTrem,
    healWord,
    iceKnife,
    thunderw,
    flameBlade,
    flameSph,
    healSpirit,
    heatMetal,
    melfAcidArrow,
    moonbeam,
    spikeGrow,
    callLightning,
    eruptingEarth,
    lightningBolt,
    tidalWave,
    windWall,
    blight,
    iceStorm,
    wallFire,
    cloudkill,
    coneCold,
    insectPlague,
    massCureWounds,
    maelstrom,
    transmuteRock,
    wrathOfNatureTrees,
    wrathOfNatureRocks,
    bonesOfTheEarth,
    sunBeam,
    wallOfThorns,
    fireStorm,
    regenerate,
    whirlwind,
    earthquake,
    feeblemind,
    sunburst,
    tsunami,
    stormOfV3
];

var EldritchKnightSpellArray = [
    burningHand,
    chromOrb,
    earthTrem,
    magicMissle,
    thunderw,
    witchBolt,
    agScorch,
    melfAcidArrow,
    scorchingRay,
    shatter,
    snowballSt,
    fireball,
    lightningBolt,
    melfMinuteMeteor,
    fireShield,
    iceStorm,
    sickRadiance,
    stormSphere,
    vitriolicSphere,
    wallFire
];

var WoFEMonkSpellArray = [
    burningHand,
    thunderw,
    shatter,
    fireball,
    wallFire,
    coneCold
];

var PaladinSpellArray = [
    cureWound,
    ensnarStrike,
    searSmite,
    sleep,
    thundSmite,
    wrathSmite,
    brandSmite,
    moonbeam,
    spiritualWeapon,
    blindSmite,
    staggerSmite,
    banishSmite,
    cloudkill,
    destructiveWave
];

var RangerSpellArray = [
    absorbElements,
    cureWound,
    ensnarStrike,
    hailOfThorn,
    zephStrike,
    healSpirit,
    spikeGrow,
    lightningArrow,
    windWall,
    conjVolley,
    steelWind,
    wrathOfNatureTrees,
    wrathOfNatureRocks
];

var ATRogueSpellArray = [
    colorSp,
    phantasmalKiller
];

var SorcererSpellArray = [
    absorbElements,
    burningHand,
    catapult,
    chaosBolt,
    chromOrb,
    colorSp,
    cureWound,
    earthTrem,
    guidBolt,
    healWord,
    iceKnife,
    inflictWound,
    magicMissle,
    rayOfSick,
    sleep,
    thunderw,
    witchBolt,
    agScorch,
    cloudDagger,
    dragonBre,
    dustDevil,
    flameSph,
    earthGrasp,
    mindSpike,
    paryerOfHealing,
    scorchingRay,
    shadowBlade,
    shatter,
    snowballSt,
    spiritualWeapon,
    eruptingEarth,
    fireball,
    lifeTrans,
    lightningBolt,
    massHealingWord,
    melfMinuteMeteor,
    spiritGuard,
    thunderStep,
    tidalWave,
    blight,
    iceStorm,
    sickRadiance,
    stormSphere,
    vitriolicSphere,
    wallFire,
    cloudkill,
    coneCold,
    dawn,
    enervation,
    flameStrike,
    immolation,
    insectPlague,
    massCureWounds,
    synapStatic,
    wallOfLight,
    bladeBarr,
    chainLightning,
    circleDeath,
    disintegrate,
    harm,
    mentalPrison,
    sunBeam,
    crownStar,
    delayedBlastFB,
    fingerOfDeath,
    fireStorm,
    prismaticSpray,
    regenerate,
    whirlwind,
    horridWither,
    earthquake,
    incendCloud,
    sunburst,
    meteorSwarm,
    psychicScream
];

var WarlockSpellArray = [
    armsOfHad,
    burningHand,
    cureWound,
    dissWhisper,
    guidBolt,
    hellRebuke,
    sleep,
    witchBolt,
    wrathSmite,
    brandSmite,
    cloudDagger,
    flameSph,
    mindSpike,
    scorchingRay,
    shadowBlade,
    shatter,
    fireball,
    hungerOfHadar,
    thunderStep,
    blight,
    evardBlack,
    fireShield,
    shadowMoil,
    sickRadiance,
    wallFire,
    banishSmite,
    coneCold,
    enervation,
    flameStrike,
    negEnergyFlood,
    synapStatic,
    wallOfLight,
    circleDeath,
    mentalPrison,
    crownStar,
    fingerOfDeath,
    feeblemind,
    madDarkness,
    psychicScream
];

var WizardSpellArray = [
    absorbElements,
    burningHand,
    catapult,
    chromOrb,
    colorSp,
    iceKnife,
    magicMissle,
    rayOfSick,
    sleep,
    thunderw,
    witchBolt,
    agScorch,
    cloudDagger,
    dragonBre,
    dustDevil,
    flameSph,
    earthGrasp,
    melfAcidArrow,
    mindSpike,
    scorchingRay,
    shadowBlade,
    shatter,
    snowballSt,
    eruptingEarth,
    fireball,
    glyphOfWardingER,
    lifeTrans,
    lightningBolt,
    melfMinuteMeteor,
    thunderStep,
    vampTouch,
    blight,
    controlWater,
    evardBlack,
    fireShield,
    iceStorm,
    mordFaithfulHound,
    phantasmalKiller,
    sickRadiance,
    stormSphere,
    vitriolicSphere,
    wallFire,
    bigbyFist,
    bigbysGraspingHand,
    cloudkill,
    coneCold,
    enervation,
    immolation,
    negEnergyFlood,
    steelWind,
    synapStatic,
    transmuteRock,
    wallOfLight,
    chainLightning,
    circleDeath,
    disintegrate,
    freezSphere,
    mentalPrison,
    sunBeam,
    wallOfIce,
    crownStar,
    delayedBlastFB,
    fingerOfDeath,
    mordenSword,
    prismaticSpray,
    symbol,
    whirlwind,
    horridWither,
    feeblemind,
    illDragon,
    incendCloud,
    madDarkness,
    sunburst,
    meteorSwarm,
    prismaticWall,
    psychicScream,
    weird
];
