import { ReactNode, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, BORDER_RADIUS } from 'components/Base'
import classNames from 'classnames'
import {
  WhitelistF,
  WebsiteF,
  TwitterNewLogoF,
  MediumF,
  TelegramF,
  DiscordF,
  VolumeF,
  TradingF,
} from 'icons'
import { PROJECT_STATUS, getProjectThemeByStatus, useProjectInfo } from 'hooks'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { LpdStatusTag } from '../common/LpdStatusTag'
import { Countdown } from '../common/CountDown'
import { projectInfo, renderVal } from '../ProjectList/index'

const LINK_SIZE = '24px'
const LINK_CLASS = 'mr-3 last:mr-0'
const LINK_COLOR = 'text-white'

const LINK_ICON_LIST: { [key: string]: ReactNode } = {
  website: (
    <WebsiteF size={LINK_SIZE} className={LINK_CLASS} color={LINK_COLOR} />
  ),
  twitter: (
    <TwitterNewLogoF
      size={LINK_SIZE}
      className={LINK_CLASS}
      color={LINK_COLOR}
    />
  ),
  medium: (
    <MediumF
      size={LINK_SIZE}
      className={classNames(LINK_CLASS, 'relative top-[-4px] left-[-4px]')}
      color={LINK_COLOR}
    />
  ),
  telegram: (
    <TelegramF size={LINK_SIZE} className={LINK_CLASS} color={LINK_COLOR} />
  ),
  discord: (
    <DiscordF size={LINK_SIZE} className={LINK_CLASS} color={LINK_COLOR} />
  ),
}

const ELIGIBLITY_SIZE = '48px'
const ELIGIBLITY_COLOR = 'text-primary'

// key: iconName
const ELIGIBILITY: { [key: string]: ReactNode } = {
  Whitelist: <WhitelistF size={ELIGIBLITY_SIZE} color={ELIGIBLITY_COLOR} />,
  'Volume of {{projectId}}': (
    <VolumeF size={ELIGIBLITY_SIZE} color={ELIGIBLITY_COLOR} />
  ),
  'Trading Volume': (
    <TradingF size={ELIGIBLITY_SIZE} color={ELIGIBLITY_COLOR} />
  ),
}

const LinkGroup = () => (
  <div className='flex ml-4'>
    {Object.keys(LINK_ICON_LIST).map(key => (
      <Box
        key={key}
        bg='bg-darkGrayBlue-700'
        padding='p-[2px]'
        className='mr-3 last:mr-0 w-fit h-fit rounded-[4px] cursor-pointer'
      >
        {LINK_ICON_LIST[key]}
      </Box>
    ))}
  </div>
)

const Label = ({ children }: { children: ReactNode }) => (
  <Text className='mb-1' color='text-third' variant='subTitle3'>
    {children}
  </Text>
)

const Value = ({ children }: { children: ReactNode }) => (
  <Text
    variant='subTitle1'
    color='text-primary'
    className='font-medium leading-6 font-semibold'
  >
    {children}
  </Text>
)

export const ProjectInfo = ({
  projectConfig,
  status,
  totalWeiRaised,
  salePrice,
}) => {
  const router = useRouter()
  const { projectId }: { projectId: string } = router.query

  const {
    chain,
    productId,
    name = '',
    description = '',
    decimal,
    baseToken,
  } = projectConfig

  const { timeDesc, timeColor, countDownField } =
    getProjectThemeByStatus(status)

  if (!projectConfig) return null

  return (
    <div>
      <div className='flex'>
        <img src='' className='mr-8 w-60 h-60 rounded-tr-2xl rounded-bl-2xl' />
        <div>
          <div className='flex justify-between'>
            <div className='max-w-[640px]'>
              {/* title */}
              <div className='flex items-center'>
                <Text
                  variant='h2'
                  className='mr-4 max-w-[274px] font-extrabold'
                >
                  {name}
                </Text>
                <LpdStatusTag status={status} />
                <LinkGroup />
              </div>

              {/* desc */}
              <Text
                className='mt-3 mb-5'
                variant='subTitle2'
                color='text-third'
              >
                {description}
              </Text>
            </div>
            <div>
              <Text
                className='mb-2 font-bold text-right'
                color={timeColor}
                variant='subTitle2'
              >
                {timeDesc}
              </Text>

              <Countdown
                timeStamp={countDownField && projectConfig[countDownField]}
                isEnd={status === PROJECT_STATUS?.END}
                isDetailPage={true}
                chainId={chain}
              />
            </div>
          </div>

          {/* Eligibility */}
          <Text
            className='mb-4 font-medium leading-6 font-semibold'
            variant='subTitle1'
            color='text-primary'
          >
            Eligibility
          </Text>
          <div className='grid grid-cols-3 gap-x-6'>
            {Object.keys(ELIGIBILITY).map((key: string, index) => (
              <Box
                key={index}
                className='flex min-w-[248px] border-0'
                bg='bg-bg3'
                padding='px-4 py-5'
              >
                <Box
                  className='w-12 h-12 border-0'
                  padding='mr-4'
                  bg='bg-white'
                  borderRadius={BORDER_RADIUS['xl']}
                >
                  {ELIGIBILITY[key]}
                </Box>
                <div>
                  <Text
                    variant='subTitle2'
                    className='mb-1'
                    color='text-lightGray-500'
                  >
                    {key?.replace('{{projectId}}', projectId)}
                  </Text>
                  <Text variant='h3' className='font-medium'>
                    No Demand
                  </Text>
                </div>
              </Box>
            ))}
          </div>
        </div>
      </div>

      {/* banner */}
      <div className='flex mt-8 mx-[-32px] py-5 px-8 bg-bg3'>
        <div className='mr-6 last:mr-0 w-[248px]'>
          <Label>{projectInfo[0]?.label}</Label>
          <Value>{`${renderVal(
            projectInfo[0]?.valueField,
            projectConfig,
          )} ${productId}`}</Value>
        </div>

        <div className='mr-6 last:mr-0 w-[248px]'>
          <Label>{projectInfo[1]?.label}</Label>
          <Value>{`${renderVal(
            projectInfo[1]?.valueField,
            projectConfig,
          )} ${projectId}`}</Value>
        </div>

        <div className='mr-6 last:mr-0 w-[248px]'>
          <Label>{projectInfo[2]?.label}</Label>

          <Value>{`1 ${productId} = ${salePrice} ${baseToken}`}</Value>
        </div>

        <div className='mr-6 last:mr-0 w-[248px]'>
          <Label>{projectInfo[3]?.label}</Label>
          <Value>{`${getFullDisplayBalance(
            totalWeiRaised,
            decimal,
            4,
          )} ${baseToken}`}</Value>
        </div>
      </div>
    </div>
  )
}
