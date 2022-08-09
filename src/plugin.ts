import type { Plugin } from 'vue'

import type { PluginInstallOptions } from './types'

export const pluginImgix: Plugin = {
    install: (
        app,
        url: string,
        {
            defaultAttributeConfig = { src: 'src', srcset: 'srcset', sizes: 'sizes' },
            defaultImgClass,
            defaultImgixParams,
            defaultSrcSetOptions,
            secureUrlToken
        }: PluginInstallOptions = {}
    ) => {
        app.provide('$pluginVueImgix', {
            url,
            defaultAttributeConfig,
            defaultImgClass,
            defaultImgixParams,
            defaultSrcSetOptions,
            secureUrlToken
        })
    }
}
