<template>
    <render />
</template>

<script lang="ts" setup>
import { computed, h } from 'vue'
import { buildUrlObject } from '@d-gs/imgix-client'

import type{
    AttributeConfig,
    Client,
    ImgixParams,
    SrcsetOptions
} from '../index'

const props = withDefaults(defineProps<{
    arWithCrop?: {
        horizontal: number
        vertical: number
    }
    attributeConfig?: AttributeConfig
    media?: string
    outputSrcset?: boolean
    sizes?: string
    tag?: 'img' | 'source'
    width?: number
    height?: number
    // Imgix
    imgixClient: Client
    imgixParams?: ImgixParams
    isPathEncoding?: boolean
    src: string
    srcsetOptions?: SrcsetOptions
}>(), {
    attributeConfig: () => ({
        src: 'src',
        srcset: 'srcset',
        sizes: 'sizes'
    }),
    outputSrcset: true,
    tag: 'img',
    isPathEncoding: false
})

const widthHeightAttrs = computed(() => {
    if (props.arWithCrop) {
        return {
            width: props.arWithCrop.horizontal,
            height: props.arWithCrop.vertical
        }
    }

    return {
        width: props.width,
        height: props.height
    }
})

const srcSrcsetAttrs = computed(() => {
    const mergedImgixParams = () => {
        if (props.arWithCrop) {
            const arWithCropParams: ImgixParams = {
                ar: `${props.arWithCrop.horizontal}:${props.arWithCrop.vertical}`,
                fit: 'crop'
            }

            return {
                ...props.imgixParams,
                ...arWithCropParams
            }
        }

        return props.imgixParams
    }

    const { src, srcset } = buildUrlObject(
        props.imgixClient,
        props.src,
        mergedImgixParams(),
        props.srcsetOptions,
        props.isPathEncoding
    )

    if (props.tag === 'source') {
        return { [props.attributeConfig.srcset]: srcset }
    }

    if (!props.outputSrcset) {
        return { [props.attributeConfig.src]: src }
    }

    return {
        [props.attributeConfig.src]: src,
        [props.attributeConfig.srcset]: srcset
    }
})

const render = () => {
    return h(props.tag, {
        ...srcSrcsetAttrs.value,
        ...widthHeightAttrs.value,
        media: props.media,
        [props.attributeConfig.sizes]: props.sizes
    })
}
</script>