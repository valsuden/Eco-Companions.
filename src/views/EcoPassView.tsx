import React from 'react';
import { motion } from 'motion/react';
import { User } from '../types';
import { 
  Lock, 
  Check, 
  Gift, 
  Crown, 
  Star, 
  Coins, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  Trees,
  Award
} from 'lucide-react';
import { useI18n } from '../utils/i18n';
import { sound } from '../utils/sound';
import { EcoIcon } from '../components/EcoIcon';

interface EcoPassViewProps {
  user: User;
  onClaimReward: (tier: number, rewardType: 'coins' | 'cosmetic', amount: number, cosmeticId?: string) => void;
}

export function EcoPassView({ user, onClaimReward }: EcoPassViewProps) {
  const currentLang = user.language || 'en';
  const t = useI18n(currentLang);

  // 15 Node Progression Path
  const passTiers = Array.from({ length: 15 }, (_, i) => {
    const tierLevel = i + 1;
    const isUnlocked = user.level >= tierLevel;
    const isClaimed = user.claimedPassTiers?.includes(tierLevel) || false;
    
    // Milestones every 3 and 5 levels
    const isPremium = tierLevel % 5 === 0;
    const isSpecial = tierLevel % 3 === 0;

    let rewardNameEs = `${tierLevel * 60} Monedas Eco`;
    let rewardNameEn = `${tierLevel * 60} Eco Coins`;
    let rewardType: 'coins' | 'cosmetic' = 'coins';
    let rewardAmount = tierLevel * 60;
    let cosmeticId = undefined;
    let iconName = 'Coins';

    if (tierLevel === 3) {
      rewardType = 'cosmetic';
      rewardNameEs = 'Gorra Liceo Caucasia';
      rewardNameEn = 'Liceo Caucasia Cap';
      cosmeticId = 'hat_liceo_cap';
      iconName = 'hat_liceo_cap';
    } else if (tierLevel === 5) {
      rewardType = 'cosmetic';
      rewardNameEs = 'Aura de Esporas Místicas';
      rewardNameEn = 'Mystic Spores Aura';
      cosmeticId = 'aura_spores';
      iconName = 'aura_spores';
    } else if (tierLevel === 8) {
      rewardType = 'cosmetic';
      rewardNameEs = 'Amuleto del Río Cauca';
      rewardNameEn = 'River Cauca Amulet';
      cosmeticId = 'acc_cauca_amulet';
      iconName = 'acc_cauca_amulet';
    } else if (tierLevel === 10) {
      rewardType = 'cosmetic';
      rewardNameEs = 'Visor Holográfico Cyber';
      rewardNameEn = 'Cyber Holographic Visor';
      cosmeticId = 'glasses_cyber_visor';
      iconName = 'glasses_cyber_visor';
    } else if (tierLevel === 15) {
      rewardType = 'cosmetic';
      rewardNameEs = 'Capa Solar Radiante';
      rewardNameEn = 'Radiant Solar Cape';
      cosmeticId = 'acc_solar_cape';
      iconName = 'acc_solar_cape';
    }

    return {
      tier: tierLevel,
      isUnlocked,
      isClaimed,
      isPremium,
      isSpecial,
      reward: {
        type: rewardType,
        amount: rewardAmount,
        id: cosmeticId,
        name: currentLang === 'es' ? rewardNameEs : rewardNameEn,
        iconName,
      },
    };
  });

  const nextTier = passTiers.find((t) => !t.isClaimed);
  const ecoPointsNextLevel = user.level * 100;
  const currentLevelProgress = Math.min(100, Math.round(((user.xp % 100) / 100) * 100));

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 select-none bg-theme-primary text-theme-primary">
      <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-theme-accent text-white shadow-md">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-theme-primary">
                  {currentLang === 'es' ? 'Camino de Progreso — Eco Pass' : 'Progress Path — Eco Pass'}
                </h1>
                <p className="text-xs text-theme-muted mt-0.5">
                  {currentLang === 'es' 
                    ? 'Avanza por el mapa de nodos ecológicos para desbloquear cosméticos y monedas.' 
                    : 'Advance through the eco node route to unlock cosmetics and coins.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Level & Points Gauge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl border border-theme bg-theme-surface shadow-md">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-black text-theme-primary gap-4">
                <span>{currentLang === 'es' ? 'Nivel de Agente' : 'Agent Level'} {user.level}</span>
                <span className="text-theme-accent">{currentLevelProgress}%</span>
              </div>
              <div className="w-36 h-2 rounded-full bg-theme-primary border border-theme overflow-hidden mt-1">
                <div 
                  className="h-full bg-theme-accent transition-all duration-500 rounded-full" 
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visual Progress Route (Camino de Nodos) */}
        <div className="glass-card border border-theme-accent rounded-3xl p-5 sm:p-8 space-y-8 relative overflow-hidden bg-theme-surface">
          {/* Decorative Path Header */}
          <div className="flex items-center justify-between text-xs font-black text-theme-muted border-b border-theme pb-3">
            <span className="flex items-center gap-1.5 text-theme-accent uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              {currentLang === 'es' ? 'Ruta Santuario Liceo' : 'Liceo Sanctuary Route'}
            </span>
            <span>
              {currentLang === 'es' ? 'Próximo Objetivo: Nivel' : 'Next Target: Level'} {nextTier ? nextTier.tier : 15}
            </span>
          </div>

          {/* Node Route Snake / Vertical Timeline */}
          <div className="relative pl-6 sm:pl-10 space-y-8">
            {/* Connecting Vertical Line */}
            <div className="absolute left-10 sm:left-14 top-4 bottom-4 w-1 bg-theme-primary border-r border-theme z-0" />

            {passTiers.map((tier, index) => {
              const isCurrentTarget = !tier.isClaimed && tier.isUnlocked;

              return (
                <div key={tier.tier} className="relative z-10 flex items-start gap-4 sm:gap-6">
                  {/* Step Node Circle */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 font-black text-xs sm:text-sm transition-all shadow-md ${
                      tier.isClaimed
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/20'
                        : tier.isUnlocked
                        ? 'bg-theme-accent text-white border-theme-accent shadow-theme-glow animate-pulse'
                        : 'bg-theme-primary text-theme-muted border-theme'
                    }`}
                  >
                    {tier.isClaimed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : tier.isUnlocked ? (
                      <span>{tier.tier}</span>
                    ) : (
                      <Lock className="w-4 h-4 opacity-60" />
                    )}
                  </motion.div>

                  {/* Node Content Card */}
                  <div
                    className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      tier.isClaimed
                        ? 'bg-theme-primary/50 border-theme text-theme-muted opacity-75'
                        : tier.isUnlocked
                        ? 'bg-theme-surface border-theme-accent shadow-theme-glow text-theme-primary'
                        : 'bg-theme-primary border-theme text-theme-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-theme-primary border border-theme text-theme-accent shrink-0">
                        {tier.reward.type === 'coins' ? (
                          <Coins className="w-6 h-6 text-amber-400" />
                        ) : (
                          <EcoIcon name={tier.reward.iconName} className="w-6 h-6" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-theme-primary text-theme-accent border border-theme">
                            NODO {tier.tier}
                          </span>
                          {tier.isPremium && (
                            <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                              <Crown className="w-3 h-3" />
                              ÉPICO
                            </span>
                          )}
                        </div>

                        <h3 className="text-xs sm:text-sm font-black mt-1 text-theme-primary">
                          {tier.reward.name}
                        </h3>
                      </div>
                    </div>

                    {/* Action Button / Badge */}
                    <div className="shrink-0">
                      {tier.isClaimed ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                          <Check className="w-3.5 h-3.5" />
                          {currentLang === 'es' ? 'Obtenido' : 'Claimed'}
                        </span>
                      ) : tier.isUnlocked ? (
                        <button
                          onClick={() => {
                            sound.playReward();
                            onClaimReward(
                              tier.tier,
                              tier.reward.type,
                              tier.reward.amount,
                              tier.reward.id
                            );
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 hover:bg-amber-300 transition-transform active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <Gift className="w-4 h-4" />
                          <span>{currentLang === 'es' ? 'Reclamar' : 'Claim'}</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-theme-muted bg-theme-primary border border-theme">
                          <Lock className="w-3.5 h-3.5" />
                          {currentLang === 'es' ? 'Bloqueado' : 'Locked'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
