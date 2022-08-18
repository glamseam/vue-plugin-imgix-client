import type { Plugin } from 'vue'

import type { Client, PluginInstallOptions } from './types'

export const pluginImgix: Plugin = {
    install: (
        app,
        url: Client['url'],
        {
            attributeConfig = { src: 'src', srcset: 'srcset', sizes: 'sizes' },
            classes,
            params,
            srcsetOptions
        }: PluginInstallOptions = {}
    ) => {
        app.provide('$pluginVueImgix', {
            url,
            attributeConfig,
            classes,
            params,
            srcsetOptions
        })
    }
}
