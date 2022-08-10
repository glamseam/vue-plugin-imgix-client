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
    attributeConfig?: AttributeConfig
    outputSrcset?: boolean
    sizes?: string
    src: string
    tag?: 'img' | 'source'
    width?: number
    height?: number
    imgixParams?: ImgixParams
    isPathEncoding?: boolean
    srcsetOptions?: SrcsetOptions
}>(), {
    outputSrcset: true,
    tag: 'img',
    isPathEncoding: false
})

const {
    defaultImgClass,
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
        sizes: props.sizes
    })
}
</script>
