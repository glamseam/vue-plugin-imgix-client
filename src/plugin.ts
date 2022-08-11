import type { Plugin } from 'vue'

import type { Client, PluginInstallOptions } from './types'

export const pluginImgix: Plugin = {
    install: (
        app,
        url: Client['url'],
        {
            defaultAttributeConfig = { src: 'src', srcset: 'srcset', sizes: 'sizes' },
            defaultImgClass,
            defaultImgixParams,
            defaultSrcsetOptions
        }: PluginInstallOptions = {}
    ) => {
        app.provide('$pluginVueImgix', {
            url,
            defaultAttributeConfig,
            defaultImgClass,
            defaultImgixParams,
            defaultSrcsetOptions
        })
    }
}
