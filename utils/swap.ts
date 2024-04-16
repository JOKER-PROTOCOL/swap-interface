import BigNumber from 'bignumber.js'

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_CEIL })

export const KEY_SWAP_SETTING = 'SWAP_SETTING'

export const getSwapSettings = () => {
  const swapSettingStr = localStorage.getItem(KEY_SWAP_SETTING)

  if (swapSettingStr) {
    try {
      const swapSetting = JSON.parse(swapSettingStr)
      return swapSetting
    } catch (e) {
      return {}
    }
  } else {
    return {}
  }
}

export const setSwapSettings = (
  settingObj: any,
  onSwapSettingChange?: (param: any) => void,
) => {
  localStorage.setItem(KEY_SWAP_SETTING, JSON.stringify(settingObj))
  onSwapSettingChange?.(settingObj)
}

export const getMinAmountBySlippage = (
  value: string | number,
  slippage?: number | string,
) => {
  if (!value) return new BigNumber(0)

  const _slippage = slippage || getSwapSettings()?.slippage || 0.5
  const bigVal = typeof value !== 'object' ? new BigNumber(value) : value

  return _slippage ? bigVal?.multipliedBy(1 - _slippage / 100) : bigVal
}

export const getDeadline = (ttl: number, currBlockTime: BigNumber) => {
  const ddl = currBlockTime?.plus?.(ttl * 60)?.valueOf()

  return ddl
}
