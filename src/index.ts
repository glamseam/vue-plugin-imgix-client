import type { Plugin } from 'vue'

import { type PluginInstallOptions as _PluginInstallOptions } from './types'

export type PluginInstallOptions = _PluginInstallOptions

export const pluginImgix: Plugin = {
    install: (
        app,
        domain: string,
        {
            defaultAttributeConfig = { src: 'src', srcset: 'srcset', sizes: 'sizes' },
            defaultImgClass,
            defaultImgixParams,
            defaultSrcSetOptions,
            secureURLToken,
            useHTTPS = true,
            includeLibraryParam = false
        }: PluginInstallOptions = {}
    ) => {
        app.provide('$pluginVueImgix', {
            domain,
            defaultAttributeConfig,
            defaultImgClass,
            defaultImgixParams,
            defaultSrcSetOptions,
            secureURLToken,
            useHTTPS,
            includeLibraryParam
        })
    }
}
