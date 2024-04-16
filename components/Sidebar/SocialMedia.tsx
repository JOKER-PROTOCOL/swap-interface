import { ReactNode } from 'react'
import classNames from 'classnames'
import { Box } from 'components/Base'
import { TwitterNewLogoF, MediumF, TelegramF, DiscordF } from 'icons'
import { SOCIAL_LINK } from 'constants/ui'

const LINK_SIZE = '24px'
const LINK_CLASS = 'mr-3 last:mr-0'
const LINK_COLOR = 'text-white'

const SOCIAL_MEDIA_MAP: { [key: string]: { icon: ReactNode; link: string } } = {
  twitter: {
    icon: (
      <TwitterNewLogoF
        size={LINK_SIZE}
        className={LINK_CLASS}
        color={LINK_COLOR}
      />
    ),
    link: SOCIAL_LINK.TWITTER,
  },
  medium: {
    icon: (
      <MediumF
        size={LINK_SIZE}
        className={classNames(LINK_CLASS, 'relative top-[-4px] left-[-4px]')}
        color={LINK_COLOR}
      />
    ),
    link: SOCIAL_LINK.MEDIUM,
  },
  telegram: {
    icon: (
      <TelegramF size={LINK_SIZE} className={LINK_CLASS} color={LINK_COLOR} />
    ),
    link: SOCIAL_LINK.TG_GROUP,
  },
  discord: {
    icon: (
      <DiscordF size={LINK_SIZE} className={LINK_CLASS} color={LINK_COLOR} />
    ),
    link: SOCIAL_LINK.DISCORD,
  },
}

export const SocialMediaContent = () => {
  return (
    <>
      {Object.keys(SOCIAL_MEDIA_MAP).map(key => {
        const { icon, link } = SOCIAL_MEDIA_MAP[key]

        if (!link || !icon) return null
        return (
          <a href={link} target='_blank' key={key}>
            <Box
              bg='bg-primary'
              padding='0'
              className='flex items-center justify-center mr-5 last:mr-0 w-8 h-8 rounded-lg cursor-pointer'
            >
              {icon}
            </Box>
          </a>
        )
      })}
    </>
  )
}

const SocialMedia = () => {
  return (
    <div className='grid grid-cols-4 gap-x-3 absolute bottom-6 left-[22px]'>
      <SocialMediaContent />
    </div>
  )
}

export default SocialMedia
