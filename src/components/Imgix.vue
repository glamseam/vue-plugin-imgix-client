<template>
    <render />
</template>

<script lang="ts" setup>
import { computed, h } from 'vue'

import {
    useImgix,
    type AttributeConfig,
    type ImgixParams,
    type SrcsetOptions
} from '../index'

const props = withDefaults(defineProps<{
    arWithCrop?: {
        horizontal: number
        vertical: number
    }
    media?: string
    outputSrcset?: boolean
    sizes?: string
    tag?: 'img' | 'source'
    width?: number
    height?: number
    // Imgix
    attributeConfig?: AttributeConfig
    imgixUrl?: string
    imgixParams?: ImgixParams
    isPathEncoding?: boolean
    src: string
    srcsetOptions?: SrcsetOptions
}>(), {
    outputSrcset: true,
    tag: 'img',
    isPathEncoding: false
})

const {
    defaultImgClass,
    defaultImgixUrl,
    buildUrlObject,
    margeAttributeConfig
} = useImgix()

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
    const mergedAttributeConfig = margeAttributeConfig(props.attributeConfig)

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
        props.imgixUrl ?? defaultImgixUrl,
        props.src,
        mergedImgixParams(),
        props.srcsetOptions,
        props.isPathEncoding
    )

    if (props.tag === 'source') {
        return {
            [mergedAttributeConfig.srcset]: srcset
        }
    }

    if (!props.outputSrcset) {
        return {
            [mergedAttributeConfig.src]: src
        }
    }

    return {
        [mergedAttributeConfig.src]: src,
        [mergedAttributeConfig.srcset]: srcset
    }
})

const render = () => {
    return h(props.tag, {
        class: defaultImgClass,
        ...srcSrcsetAttrs.value,
        ...widthHeightAttrs.value,
        media: props.media,
        sizes: props.sizes
    })
}
</script>
