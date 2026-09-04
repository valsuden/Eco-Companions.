import { motion } from 'motion/react';
import { User } from '../types';
import { Lock, Check, Gift, Crown, Star, ArrowRight } from 'lucide-react';
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

  // Mock pass data based on level
  const passTiers = Array.from({ length: 15 }, (_, i) => {
    const tierLevel = i + 1;
    const isUnlocked = user.level >= tierLevel;
    const isClaimed = user.claimedPassTiers?.includes(tierLevel) || false;
    
    // Every 5 levels is a big reward
    const isPremium = tierLevel % 5 === 0;
    
    const reward = isPremium 
      ? { type: 'cosmetic' as const, id: `pass_cosmetic_${tierLevel}`, name: `Exclusive Aura ${tierLevel}`, icon: 'sparkles', amount: 0 }
      : { type: 'coins' as const, amount: tierLevel * 50, name: `${tierLevel * 50} Coins`, icon: 'coins' };

    return {
      tier: tierLevel,
      isUnlocked,
      isClaimed,
      isPremium,
      reward
    };
  });

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 select-none bg-theme-primary text-theme-primary">
      <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-theme-accent" />
              <h1 className="text-xl sm:text-2xl font-black text-theme-primary">
                {currentLang === 'es' ? 'Pase Gratis' : 'Free Pass'}
              </h1>
            </div>
            <p className="text-xs mt-1 text-theme-muted">
              {currentLang === 'es' 
                ? 'Sube de nivel para desbloquear recompensas exclusivas.' 
                : 'Level up to unlock exclusive rewards.'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl border text-amber-400 font-extrabold text-sm shadow-inner glass-panel bg-theme-surface border-theme">
            <Star className="w-4 h-4 text-theme-accent" />
            <span>{currentLang === 'es' ? 'Nivel Actual:' : 'Current Level:'} {user.level}</span>
          </div>
        </div>

        {/* Pass Track */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {passTiers.map((tier) => (
            <motion.div
              key={tier.tier}
              whileHover={tier.isUnlocked && !tier.isClaimed ? { scale: 1.02 } : undefined}
              className={`glass-card border rounded-3xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all ${
                tier.isClaimed ? 'opacity-60 border-theme bg-theme-primary' 
                : tier.isUnlocked ? 'border-theme-accent shadow-theme-glow bg-theme-surface' 
                : 'border-theme bg-theme-primary opacity-80'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`px-2 py-1 rounded-lg text-[10px] font-black border ${
                  tier.isUnlocked ? 'bg-theme-accent/20 border-theme-accent text-theme-accent' : 'bg-theme-surface border-theme text-theme-muted'
                }`}>
                  {currentLang === 'es' ? 'NIVEL' : 'LEVEL'} {tier.tier}
                </div>
                {tier.isPremium && (
                  <div className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg">
                    <Crown className="w-3 h-3" />
                    Premium
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center py-4">
                <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3 shadow-inner ${
                  tier.isUnlocked && !tier.isClaimed ? 'border-theme-accent text-theme-accent bg-theme-primary' : 'border-theme text-theme-muted bg-theme-surface'
                }`}>
                  {tier.reward.type === 'coins' ? (
                    <span className="text-2xl font-black">💰</span>
                  ) : (
                    <EcoIcon name="sparkles" className="w-8 h-8" />
                  )}
                </div>
                <span className="font-bold text-sm text-theme-primary">{tier.reward.name}</span>
              </div>

              <div className="mt-2 pt-3 border-t border-theme">
                {tier.isClaimed ? (
                  <div className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-theme-surface text-theme-secondary border border-theme">
                    <Check className="w-4 h-4" />
                    {currentLang === 'es' ? 'Reclamado' : 'Claimed'}
                  </div>
                ) : tier.isUnlocked ? (
                  <button
                    onClick={() => {
                      sound.playReward();
                      onClaimReward(tier.tier, tier.reward.type, tier.reward.amount, tier.reward.id);
                    }}
                    className="w-full py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 bg-theme-accent text-white border border-theme-accent shadow-md hover:opacity-90 cursor-pointer"
                  >
                    <Gift className="w-4 h-4" />
                    {currentLang === 'es' ? 'Reclamar Recompensa' : 'Claim Reward'}
                  </button>
                ) : (
                  <div className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-theme-primary text-theme-muted border border-theme">
                    <Lock className="w-4 h-4" />
                    {currentLang === 'es' ? 'Bloqueado' : 'Locked'}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
