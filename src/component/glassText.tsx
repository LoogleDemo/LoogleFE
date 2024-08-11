'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Environment, Float, MeshTransmissionMaterial, Text3D } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import styles from './glassText.module.scss'

type GlassProps = {
	character: string
	index: number
}

const Text = ({ character, index }: GlassProps) => {
	const [hovered, setHovered] = useState(false)
	const initialY = 10 + Math.random() * 5 // 초기 Y 위치, 글자가 떨어지기 시작하는 위치를 무작위로 설정
	const [position, setPosition] = useState(new THREE.Vector3(index * 2 - 6, initialY, 0))
	const targetPosition = new THREE.Vector3(index * 2 - 6, 0.1, 0)
	const [velocity, setVelocity] = useState(0) // 속도 초기값
	const [bouncing, setBouncing] = useState(true) // 바운스 상태 제어
	const [bounceCount, setBounceCount] = useState(0) // 튕긴 횟수
	const [isFalling, setIsFalling] = useState(true) // 현재 글자가 떨어지는 중인지 여부

	useFrame((state, delta) => {
		if (bouncing) {
			if (isFalling) {
				// 글자가 떨어질 때
				if (position.y > targetPosition.y) {
					setVelocity((v) => v + delta * 9.8) // 중력 효과 추가
					position.y -= velocity * delta
				} else {
					// 바닥에 도달
					position.y = targetPosition.y
					setIsFalling(false)
					setVelocity(Math.abs(velocity) * 0.5) // 속도를 절반으로 줄여 튕겨오름
				}
			} else {
				// 글자가 위로 튕겨오를 때
				if (velocity > 0) {
					position.y += velocity * delta // 위로 올라감
					setVelocity((v) => v - delta * 9.8 * 2) // 속도 감소
				} else {
					// 최고점에 도달한 후 다시 떨어짐
					setIsFalling(true)
					setBounceCount(bounceCount + 1)
					if (bounceCount >= 2) {
						// 3번째 튕김 후 멈춤
						setBouncing(false)
						position.y = targetPosition.y // 최종 위치로 정착
						setVelocity(0) // 속도 0으로 설정하여 위치 고정
					}
				}
			}
		}
		setPosition(position.clone())
	})

	return (
		<Float floatIntensity={2.5} speed={index + 1}>
			<Text3D
				font='/font/Lonely Coffee_Regular.json'
				size={2}
				height={1}
				curveSegments={12}
				bevelEnabled
				bevelThickness={0.3}
				bevelSize={0.04}
				bevelOffset={0}
				bevelSegments={5}
				position={position}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}>
				{character}

				<MeshTransmissionMaterial
					color={'lightblue'}
					opacity={1}
					metalness={0}
					roughness={0}
					transmission={1}
					ior={3}
					thickness={0}
					specularIntensity={1}
					specularColor='white'
					envMapIntensity={1}
					reflectivity={1}
					iridescence={0}
					iridescenceIOR={1}
					clearcoat={1}
					clearcoatRoughness={0}
				/>
			</Text3D>
		</Float>
	)
}

const CameraController = () => {
	const cameraRef = useRef<THREE.Vector3 | null>(null)
	const [targetZ, setTargetZ] = useState(20)

	useEffect(() => {
		const handleResize = () => {
			if (typeof window !== 'undefined') {
				setTargetZ(window.innerWidth < 900 ? 30 : 20)
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useFrame((state, delta) => {
		const camera = state.camera
		const targetPosition = new THREE.Vector3(0, 0, targetZ)

		if (!cameraRef.current) {
			cameraRef.current = targetPosition.clone()
		}

		cameraRef.current.lerp(targetPosition, delta * 2)
		camera.position.copy(cameraRef.current)
		camera.updateProjectionMatrix()
	})

	return null
}

const GlassText = () => {
	const text = 'LOOGLE'

	return (
		<div className={styles.glassText}>
			<Canvas
				camera={{
					position: [0, 0, typeof window !== 'undefined' && window.innerWidth < 900 ? 30 : 20],
					fov: 50,
					near: 0.1,
					far: 100,
				}}>
				<CameraController />
				<Environment
					files='/image/sky.hdr'
					background
					backgroundBlurriness={0.1}
					backgroundIntensity={2.5}></Environment>

				<Suspense fallback={null}>
					{text.split('').map((char, index) => (
						<Text key={index} character={char} index={index} />
					))}
				</Suspense>
			</Canvas>
		</div>
	)
}

export default GlassText
